-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ObrasArtistas;

USE ObrasArtistas;

-- Crear la tabla Artistas
CREATE TABLE artistas (
    idartista INT AUTO_INCREMENT PRIMARY KEY,   -- idartista autoincrementable
    nombre VARCHAR(100) NOT NULL UNIQUE,         -- Nombre del artista, clave única
    apellidos VARCHAR(100),                     -- Apellidos del artista
    fechaNacimiento DATE NOT NULL,              -- Fecha de nacimiento del artista
    tipoArte ENUM('abstracto', 'creativo', 'realista', 'surrealista', 'contemporaneo') NOT NULL, -- Tipo de arte del artista
    paisDeNacimiento VARCHAR(100)               -- País de nacimiento del artista
);

-- Crear la tabla Obras con ON DELETE SET NULL
CREATE TABLE obras (
    idobra INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,         -- Nombre de la obra, clave única
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
('Obra3', 'Descripción3', '2022-03-01', '300.00', 1),
('Obra4', 'Descripción4', '2022-04-01', '400.00', 8),
('Obra5', 'Descripción5', '2022-05-01', '500.00', 1),
('Obra6', 'Descripción6', '2022-06-01', '600.00', 6),
('Obra7', 'Descripción7', '2022-07-01', '700.00', 8),
('Obra8', 'Descripción8', '2022-08-01', '800.00', 1),
('Obra9', 'Descripción9', '2022-09-01', '900.00', 9),
('Obra10', 'Descripción10', '2022-10-01', '1000.00', 10);

-- Modificar la tabla `obras` para agregar la columna `imagen_url`
ALTER TABLE obras ADD COLUMN imagen_url VARCHAR(255);

-- Crear índices en las columnas más utilizadas para búsquedas
CREATE INDEX idx_artista_nombre ON artistas (nombre);
CREATE INDEX idx_artista_apellidos ON artistas (apellidos);
CREATE INDEX idx_artista_fecha ON artistas (fechaNacimiento);
CREATE INDEX idx_artista_tipo ON artistas (tipoArte);

CREATE INDEX idx_obra_nombre ON obras (nombre);
CREATE INDEX idx_obra_fecha ON obras (fecha);
CREATE INDEX idx_obra_precio ON obras (precio);

-- Actualizar la tabla obras con URLs de imágenes
UPDATE obras SET imagen_url = 'https://hips.hearstapps.com/hmg-prod/images/la-noche-estrellada1-1586872678-6438fc97a96e4.jpg' WHERE idobra = 1;
UPDATE obras SET imagen_url = 'https://phantom-expansion.unidadeditorial.es/b49de40df87602749238c6fe6746eefb/crop/0x67/1996x1396/resize/828/f/jpg/assets/multimedia/imagenes/2022/03/16/16474305081017.jpg' WHERE idobra = 2;
UPDATE obras SET imagen_url = 'https://hips.hearstapps.com/hmg-prod/images/the-creation-of-adam-by-michelangelo-is-painted-on-the-news-photo-1652350574.jpg?resize=980:*' WHERE idobra = 3;
UPDATE obras SET imagen_url = 'https://img.photolamus.com/B4LHCWFS/335x243/c/m/51e30e0cec42ce0686536bc397be6e3c/17-starry-night-over-the-rhone-0-335-x-243.png' WHERE idobra = 4;
UPDATE obras SET imagen_url = 'https://media.revistaad.es/photos/60c22da019c8e1b95e8d555b/16:9/w_1280,c_limit/202522.jpg' WHERE idobra = 5;
UPDATE obras SET imagen_url = 'https://cdn.shopify.com/s/files/1/2658/9826/files/La_vaca_amarilla_franz_marc_480x480.jpg' WHERE idobra = 6;
UPDATE obras SET imagen_url = 'https://i0.wp.com/notiespartano.com/wp-content/uploads/2022/07/Sin-titulo-25.png?fit=760%2C512&ssl=1' WHERE idobra = 7;
UPDATE obras SET imagen_url = 'https://www.singulart.com/blog/wp-content/uploads/2023/11/Paintings-by-Joan-Miro.jpg' WHERE idobra = 8;
UPDATE obras SET imagen_url = 'https://cdn.aarp.net/content/dam/aarpe/es/home/entretenimiento/expertos/ernesto-lechner/info-2016/fotos-cuadros-pinturas-arte-para-celebrar-el-amor/_jcr_content/root/container_main/container_body_main/list_container_body1/container_body_cf/body_one_cf_listicle_one/cfimage.coreimg.50.932.jpeg/content/dam/aarp/entertainment/art_music/2016/2016-02/1140-paintings-celebrate-love-klimt-the-kiss-esp.jpg' WHERE idobra = 9;
UPDATE obras SET imagen_url = 'https://www.muyinteresante.com/wp-content/uploads/sites/5/2023/12/14/657ae191044e5.jpeg' WHERE idobra = 10;

