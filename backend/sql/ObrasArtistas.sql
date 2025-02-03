-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ObrasArtistas;

USE ObrasArtistas;

-- Crear la tabla Artistas
CREATE TABLE artistas (
    idartista INT AUTO_INCREMENT PRIMARY KEY,   -- idartista autoincrementable
    nombre VARCHAR(100) NOT NULL,               -- Nombre del artista
    apellidos VARCHAR(100),                     -- Apellidos del artista
    fechaCreacion DATE NOT NULL                 -- Fecha de creación del artista
);

-- Crear la tabla Obras
CREATE TABLE obras (
    idobra INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha DATETIME NOT NULL,
    precio DECIMAL(10, 2),
    idartista INT,                             -- Agregar columna idartista
    FOREIGN KEY (idartista) REFERENCES artistas(idartista) ON DELETE CASCADE ON UPDATE CASCADE  -- Clave foránea correcta
);

-- Insertar datos en la tabla Artistas
INSERT INTO `artistas` (`idartista`, `nombre`, `apellidos`, `fechaCreacion`) VALUES
(1, 'Artista1', 'Apellidos1', '2022-01-01'),
(2, 'Artista2', 'Apellidos2', '2022-01-01'),
(3, 'Artista3', 'Apellidos3', '2022-01-01'),
(4, 'Artista4', 'Apellidos4', '2022-01-01'),
(5, 'Artista5', 'Apellidos5', '2022-01-01'),
(6, 'Artista6', 'Apellidos6', '2022-01-01'),
(7, 'Artista7', 'Apellidos7', '2022-01-01'),
(8, 'Artista8', 'Apellidos8', '2022-01-01'),
(9, 'Artista9', 'Apellidos9', '2022-01-01'),
(10, 'Artista10', 'Apellidos10', '2022-01-01');

-- Insertar datos en la tabla Obras
INSERT INTO `obras` (`idobra`, `nombre`, `descripcion`, `fecha`, `precio`, `idartista`) VALUES
(1, 'Obra1', 'Descripción1', '2022-01-01 00:00:00', '100.00', 1),
(2, 'Obra2', 'Descripción2', '2022-01-01 00:00:00', '200.00', 2),
(3, 'Obra3', 'Descripción3', '2022-01-01 00:00:00', '300.00', 3),
(4, 'Obra4', 'Descripción4', '2022-01-01 00:00:00', '400.00', 4),
(5, 'Obra5', 'Descripción5', '2022-01-01 00:00:00', '500.00', 5),
(6, 'Obra6', 'Descripción6', '2022-01-01 00:00:00', '600.00', 6),
(7, 'Obra7', 'Descripción7', '2022-01-01 00:00:00', '700.00', 7),
(8, 'Obra8', 'Descripción8', '2022-01-01 00:00:00', '800.00', 8),
(9, 'Obra9', 'Descripción9', '2022-01-01 00:00:00', '900.00', 9),
(10, 'Obra10', 'Descripción10', '2022-01-01 00:00:00', '1000.00', 10);

-- Crear índices en las columnas más usadas para búsquedas rápidas
CREATE INDEX idx_artista_nombre ON artistas (nombre);
CREATE INDEX idx_artista_apellidos ON artistas (apellidos);
CREATE INDEX idx_artista_fecha ON artistas (fechaCreacion);

CREATE INDEX idx_obra_nombre ON obras (nombre);
CREATE INDEX idx_obra_fecha ON obras (fecha);
CREATE INDEX idx_obra_precio ON obras (precio);

-- Filtros: Si deseas obtener información de artistas con ciertas condiciones, puedes hacerlo así:
-- Ejemplo: Obtener todos los artistas cuya fecha de creación sea posterior a 2020
SELECT * FROM artistas WHERE fechaCreacion > '2020-01-01';

-- Ejemplo: Obtener todas las obras cuyo precio sea mayor a 500
SELECT * FROM obras WHERE precio > 500;
