$carpetas = @(
    "src/app/core/services",
    "src/app/core/interceptors",
    "src/app/core/guards",
    "src/app/shared/components",
    "src/app/shared/pipes",
    "src/app/shared/directives",
    "src/app/shared/models",
    "src/app/features/reportes/components",
    "src/app/features/reportes/services",
    "src/app/features/autenticacion/components",
    "src/app/features/autenticacion/services"
)

foreach ($carpeta in $carpetas) {
    New-Item -ItemType Directory -Path $carpeta -Force
}