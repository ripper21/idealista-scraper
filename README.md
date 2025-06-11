# 🏠 Idealista Scraper

Este proyecto automatiza la extracción de datos de propiedades listadas en Idealista, y los guarda directamente en una hoja de cálculo de Google Sheets.

## 🚀 Funcionalidades

- Recorre URLs de Idealista desde un archivo `urls.txt`
- Ejecuta un script JavaScript que:
  - Detecta si el anuncio contiene teléfono
  - Extrae datos como: fecha, precio, dirección, contacto, superficie, planta, habitaciones...
  - Rechaza anuncios que mencionen agencias o inmobiliarias
- Inserta los datos en Google Sheets

## 🧰 Requisitos

- Python 3.10+
- Google Chrome instalado
- ChromeDriver compatible con tu versión de Chrome
- Credenciales de Google en `credentials.json`
- Cuenta de Google con acceso a una hoja de cálculo llamada `Idealista Datos`

## 📦 Instalación

```bash
git clone https://github.com/ripper21/idealista-scraper.git
cd idealista-scraper
python -m venv venv
venv\Scripts\activate  # En Windows
pip install -r requirements.txt
```

## 🔐 Configurar credenciales de Google

1. Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita la API de Google Sheets
3. Crea una cuenta de servicio
4. Descarga el archivo JSON como `credentials.json` y colócalo en la raíz del proyecto
5. Comparte la hoja de cálculo con el email de la cuenta de servicio

## 📝 Cómo usar

1. Agrega las URLs que quieras analizar dentro de `urls.txt` (una por línea)
2. Ejecuta el script principal:

```bash
python main.py
```

3. Verás los resultados escritos en tu hoja de cálculo de Google Sheets.

## 📁 Estructura del proyecto

```
idealista-scraper/
├── main.py
├── scraper.js
├── urls.txt
├── credentials.json       # No incluido en el repositorio
├── README.md
├── .gitignore
└── venv/                  # No incluido en el repositorio
```

## ⚠️ Notas

- Los datos se escriben en Google Sheets en modo "USER_ENTERED"
- Si una URL incluye términos como "agencia", "inmobiliaria", se descartará automáticamente
- Si una celda está vacía, se reemplaza por `"N/A"` para evitar errores

## 📄 Licencia

MIT