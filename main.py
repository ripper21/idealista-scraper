from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Google Sheets config
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(credentials)
sheet = client.open("Idealista Datos").sheet1

# Selenium config
options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=options)
driver.set_script_timeout(20)

# Cargar JS
with open("scraper.js", "r", encoding="utf-8") as f:
    js_script = f.read()

# Cargar URLs
with open("urls.txt", "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f.readlines() if line.strip()]

# Procesar URLs
for url in urls:
    try:
        driver.get(url)
        time.sleep(4)
        result = driver.execute_async_script(js_script)

        if isinstance(result, str):
            if "No quiere agencias" in result or "No es particular" in result:
                print(f"⏩ Saltado: {result} ({url})")
                continue
            else:
                print(f"⚠️ Resultado string no esperado en {url}: {result}")

        elif isinstance(result, list):
            # Limpiar y validar datos
            clean_row = [str(cell).strip() if cell and str(cell).strip() else "N/A" for cell in result]
            
            # Agregar fila a Google Sheets
            sheet.append_row(clean_row, value_input_option="USER_ENTERED")
            print(f"✔️ Datos guardados en nueva fila: {url}")
            print(f"   Datos: {clean_row[:3]}...")  # Mostrar primeros 3 campos para debug

        else:
            print(f"⚠️ Resultado inesperado en {url}: {type(result)} - {result}")

    except Exception as e:
        print(f"⚠️ Error en {url}: {e}")

driver.quit()