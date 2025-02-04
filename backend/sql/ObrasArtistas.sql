-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ObrasArtistas;

USE ObrasArtistas;

-- Crear la tabla Artistas
CREATE TABLE artistas (
    idartista INT AUTO_INCREMENT PRIMARY KEY,   -- idartista autoincrementable
    nombre VARCHAR(100) NOT NULL,               -- Nombre del artista
    apellidos VARCHAR(100),                     -- Apellidos del artista
    fechaNacimiento DATE NOT NULL,              -- Fecha de creación del artista
    tipoArte ENUM('abstracto', 'creativo', 'realista', 'surrealista', 'contemporaneo') NOT NULL, -- Tipo de arte del artista
    paisDeNacimiento VARCHAR(100)               -- País de nacimiento del artista
);

-- Crear la tabla Obras
CREATE TABLE obras (
    idobra INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,                       -- Cambiar tipo de DATETIME a DATE
    precio DECIMAL(10, 2),
    idartista INT,                             -- Agregar columna idartista
    FOREIGN KEY (idartista) REFERENCES artistas(idartista) ON DELETE CASCADE ON UPDATE CASCADE  -- Clave foránea correcta
);

-- Insertar datos en la tabla Artistas
INSERT INTO `artistas` (`idartista`, `nombre`, `apellidos`, `fechaNacimiento`, `tipoArte`, `paisDeNacimiento`) VALUES
(1, 'Artista1', 'Apellidos1', '2022-01-01', 'abstracto', 'España'),
(2, 'Artista2', 'Apellidos2', '2022-01-01', 'creativo', 'Argentina'),
(3, 'Artista3', 'Apellidos3', '2022-01-01', 'realista', 'México'),
(4, 'Artista4', 'Apellidos4', '2022-01-01', 'surrealista', 'Francia'),
(5, 'Artista5', 'Apellidos5', '2022-01-01', 'contemporaneo', 'Italia'),
(6, 'Artista6', 'Apellidos6', '2022-01-01', 'abstracto', 'España'),
(7, 'Artista7', 'Apellidos7', '2022-01-01', 'creativo', 'Colombia'),
(8, 'Artista8', 'Apellidos8', '2022-01-01', 'realista', 'Perú'),
(9, 'Artista9', 'Apellidos9', '2022-01-01', 'surrealista', 'Chile'),
(10, 'Artista10', 'Apellidos10', '2022-01-01', 'contemporaneo', 'Brasil');

-- Insertar datos en la tabla Obras
INSERT INTO `obras` (`idobra`, `nombre`, `descripcion`, `fecha`, `precio`, `idartista`) VALUES
(1, 'Obra1', 'Descripción1', '2022-01-01', '100.00', 1),
(2, 'Obra2', 'Descripción2', '2022-01-01', '200.00', 2),
(3, 'Obra3', 'Descripción3', '2022-01-01', '300.00', 3),
(4, 'Obra4', 'Descripción4', '2022-01-01', '400.00', 4),
(5, 'Obra5', 'Descripción5', '2022-01-01', '500.00', 5),
(6, 'Obra6', 'Descripción6', '2022-01-01', '600.00', 6),
(7, 'Obra7', 'Descripción7', '2022-01-01', '700.00', 7),
(8, 'Obra8', 'Descripción8', '2022-01-01', '800.00', 8),
(9, 'Obra9', 'Descripción9', '2022-01-01', '900.00', 9),
(10, 'Obra10', 'Descripción10', '2022-01-01', '1000.00', 10);

-- Crear índices en las columnas más usadas para búsquedas rápidas
CREATE INDEX idx_artista_nombre ON artistas (nombre);
CREATE INDEX idx_artista_apellidos ON artistas (apellidos);
CREATE INDEX idx_artista_fecha ON artistas (fechaNacimiento);
CREATE INDEX idx_artista_tipo ON artistas (tipoArte);

CREATE INDEX idx_obra_nombre ON obras (nombre);
CREATE INDEX idx_obra_fecha ON obras (fecha);
CREATE INDEX idx_obra_precio ON obras (precio);
