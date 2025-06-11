import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Ámbitos necesarios
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# Cargar credenciales
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)

# Autorizar cliente
client = gspread.authorize(creds)

# Abrir hoja por nombre
sheet = client.open("Idealista Datos").sheet1

# Escribir una fila de prueba
sheet.append_row(["✅ Conexión exitosa desde Python"])

print("✅ Conectado correctamente y fila escrita.")
