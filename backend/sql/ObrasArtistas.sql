-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ObrasArtistas;

USE ObrasArtistas;

-- Crear la tabla Artistas
CREATE TABLE artistas (
    idartista INT AUTO_INCREMENT PRIMARY KEY,   -- idartista autoincrementable
    nombre VARCHAR(100) NOT NULL,               -- Nombre del artista
    apellidos VARCHAR(100),                     -- Apellidos del artista
    fechaNacimiento DATE NOT NULL,              -- Fecha de nacimiento del artista
    tipoArte ENUM('abstracto', 'creativo', 'realista', 'surrealista', 'contemporaneo') NOT NULL, -- Tipo de arte del artista
    paisDeNacimiento VARCHAR(100)               -- País de nacimiento del artista
);

-- Crear la tabla Obras con ON DELETE SET NULL
CREATE TABLE obras (
    idobra INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,                       -- Tipo de fecha cambiado a DATE
    precio DECIMAL(10, 2),
    idartista INT NULL,                        -- Permitir valores NULL
    FOREIGN KEY (idartista) REFERENCES artistas(idartista) 
    ON DELETE SET NULL ON UPDATE CASCADE       -- Si se borra un artista, sus obras quedan con idartista = NULL
);

-- Insertar datos en la tabla Artistas
INSERT INTO artistas (nombre, apellidos, fechaNacimiento, tipoArte, paisDeNacimiento) VALUES
('Artista1', 'Apellidos1', '1980-01-01', 'abstracto', 'España'),
('Artista2', 'Apellidos2', '1985-02-01', 'creativo', 'Argentina'),
('Artista3', 'Apellidos3', '1990-03-01', 'realista', 'México'),
('Artista4', 'Apellidos4', '1975-04-01', 'surrealista', 'Francia'),
('Artista5', 'Apellidos5', '1988-05-01', 'contemporaneo', 'Italia'),
('Artista6', 'Apellidos6', '1979-06-01', 'abstracto', 'España'),
('Artista7', 'Apellidos7', '1992-07-01', 'creativo', 'Colombia'),
('Artista8', 'Apellidos8', '1995-08-01', 'realista', 'Perú'),
('Artista9', 'Apellidos9', '1983-09-01', 'surrealista', 'Chile'),
('Artista10', 'Apellidos10', '1991-10-01', 'contemporaneo', 'Brasil');

-- Insertar datos en la tabla Obras
INSERT INTO obras (nombre, descripcion, fecha, precio, idartista) VALUES
('Obra1', 'Descripción1', '2022-01-01', '100.00', 1),
('Obra2', 'Descripción2', '2022-02-01', '200.00', 2),
('Obra3', 'Descripción3', '2022-03-01', '300.00', 3),
('Obra4', 'Descripción4', '2022-04-01', '400.00', 4),
('Obra5', 'Descripción5', '2022-05-01', '500.00', 5),
('Obra6', 'Descripción6', '2022-06-01', '600.00', 6),
('Obra7', 'Descripción7', '2022-07-01', '700.00', 7),
('Obra8', 'Descripción8', '2022-08-01', '800.00', 8),
('Obra9', 'Descripción9', '2022-09-01', '900.00', 9),
('Obra10', 'Descripción10', '2022-10-01', '1000.00', 10);

-- Crear índices en las columnas más utilizadas para búsquedas
CREATE INDEX idx_artista_nombre ON artistas (nombre);
CREATE INDEX idx_artista_apellidos ON artistas (apellidos);
CREATE INDEX idx_artista_fecha ON artistas (fechaNacimiento);
CREATE INDEX idx_artista_tipo ON artistas (tipoArte);

CREATE INDEX idx_obra_nombre ON obras (nombre);
CREATE INDEX idx_obra_fecha ON obras (fecha);
CREATE INDEX idx_obra_precio ON obras (precio);
