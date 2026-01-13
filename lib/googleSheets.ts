import { google } from "googleapis";

// Configuración de Google Sheets
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const RANGE_USERS = "Users!A:D"; // Email, Name, Password (hashed), CreatedAt
const RANGE_WATCHED = "Watched!A:C"; // UserId, ItemId, CreatedAt

// Inicializar cliente de Google Sheets
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  return sheets;
}

// Obtener todos los usuarios
export async function getUsers() {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_USERS,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    // Saltar el encabezado si existe
    const dataRows = rows.slice(1);
    return dataRows.map((row) => ({
      email: row[0] || "",
      name: row[1] || "",
      password: row[2] || "",
      createdAt: row[3] || "",
    }));
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
}

// Buscar usuario por email
export async function getUserByEmail(email: string) {
  const users = await getUsers();
  return users.find((user) => user.email === email);
}

// Crear nuevo usuario
export async function createUser(
  email: string,
  name: string,
  hashedPassword: string
) {
  try {
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_USERS,
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, name, hashedPassword, new Date().toISOString()]],
      },
    });
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

// Obtener items vistos por usuario
export async function getWatchedItems(userId: string): Promise<number[]> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_WATCHED,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    // Filtrar por userId y retornar solo los itemIds
    const dataRows = rows.slice(1); // Saltar encabezado
    return dataRows
      .filter((row) => row[0] === userId)
      .map((row) => parseInt(row[1] || "0"))
      .filter((id) => !isNaN(id));
  } catch (error) {
    console.error("Error getting watched items:", error);
    return [];
  }
}

// Agregar item visto
export async function addWatchedItem(userId: string, itemId: number) {
  try {
    const sheets = await getSheetsClient();
    
    // Primero verificar si ya existe
    const watched = await getWatchedItems(userId);
    if (watched.includes(itemId)) {
      return true; // Ya existe
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_WATCHED,
      valueInputOption: "RAW",
      requestBody: {
        values: [[userId, itemId.toString(), new Date().toISOString()]],
      },
    });
    return true;
  } catch (error) {
    console.error("Error adding watched item:", error);
    return false;
  }
}

// Eliminar item visto
export async function removeWatchedItem(userId: string, itemId: number) {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_WATCHED,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return false;

    // Filtrar la fila a eliminar y mantener el encabezado
    const header = rows[0];
    const dataRows = rows.slice(1);
    const filteredRows = dataRows.filter(
      (row) => !(row[0] === userId && row[1] === itemId.toString())
    );

    // Si no se encontró la fila, retornar true (ya no existe)
    if (filteredRows.length === dataRows.length) {
      return true;
    }

    // Reescribir todas las filas
    const allRows = [header, ...filteredRows];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_WATCHED,
      valueInputOption: "RAW",
      requestBody: {
        values: allRows,
      },
    });

    return true;
  } catch (error) {
    console.error("Error removing watched item:", error);
    return false;
  }
}

// Obtener ID de la hoja por nombre
async function getSheetId(sheetName: string): Promise<number> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = response.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );
    return sheet?.properties?.sheetId || 0;
  } catch (error) {
    console.error("Error getting sheet ID:", error);
    return 0;
  }
}

// Inicializar las hojas de cálculo (crear encabezados si no existen)
export async function initializeSheets() {
  try {
    const sheets = await getSheetsClient();

    // Verificar si las hojas existen, si no, crearlas
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetNames = spreadsheet.data.sheets?.map(
      (s) => s.properties?.title || ""
    ) || [];

    // Crear hoja Users si no existe
    if (!sheetNames.includes("Users")) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Users",
                },
              },
            },
          ],
        },
      });

      // Agregar encabezados
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "Users!A1:D1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["Email", "Name", "Password", "CreatedAt"]],
        },
      });
    }

    // Crear hoja Watched si no existe
    if (!sheetNames.includes("Watched")) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Watched",
                },
              },
            },
          ],
        },
      });

      // Agregar encabezados
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "Watched!A1:C1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["UserId", "ItemId", "CreatedAt"]],
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error initializing sheets:", error);
    return false;
  }
}
