-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2021 a las 02:49:53
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `data_werehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(5) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_pais` int(5) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `active` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `id_pais`, `nombre`, `active`) VALUES
(1, 1, 'buenos aires', 'no'),
(2, 1, 'cordoba', 'si'),
(3, 1, 'santa fe', 'si'),
(4, 1, 'mendoza', 'si'),
(5, 1, 'entre rios', 'si'),
(6, 1, 'san juan', 'si'),
(7, 1, 'san luis', 'si'),
(8, 1, 'santiago del estero', 'si'),
(9, 1, 'tucuman', 'si'),
(10, 1, 'salta', 'si'),
(11, 1, 'jujuy', 'si'),
(12, 1, 'formosa', 'si'),
(13, 1, 'chaco', 'si'),
(14, 1, 'misiones', 'si'),
(15, 1, 'corrientes', 'si'),
(16, 1, 'la pampa', 'si'),
(17, 1, 'chubut', 'si'),
(18, 1, 'santa cruz', 'si'),
(19, 1, 'rio negro', 'si'),
(20, 1, 'neuquen', 'si'),
(21, 1, 'la rioja', 'si'),
(22, 1, 'catamarca', 'si'),
(23, 1, 'tierra del fuego', 'si'),
(24, 2, 'rio de janeiro', 'si'),
(25, 2, 'brasilia', 'si'),
(26, 2, 'florianopolis', 'si'),
(27, 2, 'fortaleza', 'si'),
(28, 2, 'recife', 'si'),
(29, 2, 'san pablo', 'si'),
(30, 2, 'porto alegre', 'si'),
(31, 3, 'montevideo', 'si'),
(32, 3, 'punta del este', 'si'),
(33, 3, 'maldonado', 'si'),
(34, 3, 'salto', 'si'),
(35, 3, 'piriapolis', 'si'),
(36, 4, 'santiago de chile', 'si'),
(37, 5, 'asuncion', 'si'),
(38, 6, 'lima', 'si'),
(39, 7, 'la paz', 'si'),
(40, 8, 'bogota', 'si'),
(41, 8, 'medellin', 'si'),
(42, 9, 'caracas', 'si'),
(43, 10, 'san juan', 'si'),
(44, 11, 'la havana', 'si'),
(45, 12, 'distrito federal', 'si'),
(46, 12, 'cancun', 'si'),
(47, 12, 'playa del carmen', 'si'),
(48, 13, 'nueva york', 'si'),
(49, 13, 'washignton', 'si'),
(50, 13, 'california', 'si'),
(51, 13, 'florida', 'si'),
(52, 13, 'texas', 'si'),
(53, 13, 'carolina del norte', 'si'),
(54, 13, 'carolina del sur', 'si'),
(55, 14, 'toronto', 'si'),
(56, 14, 'vancouver', 'si'),
(57, 15, 'madrid', 'si'),
(58, 15, 'barcelona', 'si'),
(59, 15, 'sevilla', 'si'),
(60, 15, 'malaga', 'si'),
(61, 15, 'valencia', 'si'),
(62, 15, 'granada', 'si'),
(63, 15, 'bilbao', 'si'),
(65, 16, 'porto', 'si'),
(66, 16, 'lisboa', 'si'),
(67, 17, 'paris', 'si'),
(68, 17, 'lille', 'si'),
(69, 17, 'marsella', 'si'),
(70, 17, 'toulon', 'si'),
(71, 17, 'perpignian', 'si'),
(72, 18, 'roma', 'si'),
(73, 18, 'torino', 'si'),
(74, 18, 'florencia', 'si'),
(75, 18, 'venecia', 'si'),
(76, 18, 'sicilia', 'si'),
(77, 18, 'napoli', 'si'),
(78, 19, 'londres', 'si'),
(79, 19, 'manchester', 'si'),
(80, 19, 'liverpool', 'si'),
(81, 20, 'dublin', 'si'),
(82, 21, 'edinburgo', 'si'),
(83, 21, 'glasgow', 'si'),
(84, 22, 'cardiff', 'si'),
(85, 23, 'munich', 'si'),
(86, 23, 'berlin', 'si'),
(87, 24, 'amsterdam', 'si'),
(88, 24, 'rotterdam', 'si'),
(89, 25, 'bruselas', 'si'),
(90, 26, 'estocolmo', 'si'),
(91, 27, 'zurich', 'si'),
(92, 28, 'varsovia', 'si'),
(93, 29, 'praga', 'si'),
(94, 30, 'zagreb', 'si'),
(95, 31, 'moscu', 'si'),
(96, 32, 'oslo', 'si'),
(97, 33, 'helsinki', 'si'),
(98, 34, 'ciudad del cabo', 'si'),
(99, 34, 'pretoria', 'si'),
(100, 35, 'el cairo', 'si'),
(101, 36, '', 'si'),
(102, 37, 'yamusukro', 'si'),
(103, 38, 'rabat', 'si'),
(104, 39, 'tokio', 'si'),
(105, 40, 'beijin', 'si'),
(106, 41, 'seul', 'si'),
(107, 42, 'pionyang', 'si'),
(108, 43, 'sidney', 'si'),
(109, 43, 'melbourne', 'si'),
(110, 44, 'wellington', 'si'),
(111, 45, 'nukualofa', 'si'),
(112, 46, 'suva', 'si'),
(113, 17, 'niza', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companias`
--

CREATE TABLE `companias` (
  `id_compania` int(100) NOT NULL,
  `id_pais` int(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `id_ciudad` int(100) NOT NULL,
  `active` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companias`
--

INSERT INTO `companias` (`id_compania`, `id_pais`, `nombre`, `direccion`, `email`, `telefono`, `id_ciudad`, `active`) VALUES
(1, 1, 'globant', 'av san vicente 1256', 'globant1@gmail.com', '112548965', 1, 'si'),
(2, 1, 'mercado libre', 'av. colon 123', 'meli@hotmail.com', '1125264', 1, 'si'),
(3, 1, 'acamica', 'av. sarmiento 369', 'acamica@hotmail.com', '11478965', 1, 'si'),
(4, 1, 'roggio', 'monsenior pablo cabrera 1400', 'roggio@hotmail.com', '351247895', 2, 'si'),
(5, 1, 'coderhouse', 'av corrientes 1200', 'coderh@hotmail.com', '114563823', 1, 'si'),
(6, 1, 'prodec', 'carlos andres 123', 'prodec@hotmail.com', '351248796', 2, 'si'),
(7, 13, 'facebook', 'washington 500', 'facebook@hotmail.com', '946652233', 50, 'si'),
(8, 13, 'google', '5ta av.', 'google@hotmail.com', '946896214', 48, 'si'),
(9, 13, 'amazon', '7ta av.', 'amazon@hotmail.com', '789542163', 48, 'si'),
(10, 1, 'montesco', 'blas pascal 5680', 'montesco@hotmail.com', '35124896', 2, 'si'),
(11, 1, 'vawa', 'av.chacabuco 123', 'vawa@gmail.com', '351247586', 2, 'si');

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(100) NOT NULL,
  `id_region` int(5) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `active` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `id_region`, `nombre`, `active`) VALUES
(0, 1, 'guatemala', 'si'),
(1, 1, 'Argentina', 'si'),
(2, 1, 'brasil', 'si'),
(3, 1, 'uruguay', 'si'),
(4, 1, 'chile', 'si'),
(5, 1, 'paraguay', 'si'),
(6, 1, 'peru', 'si'),
(7, 1, 'bolivia', 'si'),
(8, 1, 'colombia', 'si'),
(9, 1, 'venezuela', 'si'),
(10, 1, 'puerto rico', 'si'),
(11, 1, 'cuba', 'si'),
(12, 1, 'mexico', 'si'),
(13, 2, 'estados unidos', 'si'),
(14, 2, 'canada', 'si'),
(15, 3, 'españa', 'si'),
(16, 3, 'portugal', 'si'),
(17, 3, 'francia', 'si'),
(18, 3, 'italia', 'si'),
(19, 3, 'inglaterra', 'si'),
(20, 3, 'irlanda', 'si'),
(21, 3, 'escocia', 'si'),
(22, 3, 'gales', 'si'),
(23, 3, 'alemania', 'si'),
(24, 3, 'holanda', 'si'),
(25, 3, 'belgica', 'si'),
(26, 3, 'suecia', 'si'),
(27, 3, 'suiza', 'si'),
(28, 3, 'polonia', 'si'),
(29, 3, 'republica checa', 'si'),
(30, 3, 'croacia', 'si'),
(31, 3, 'rusia', 'si'),
(32, 3, 'noruega', 'si'),
(33, 3, 'finlandia', 'si'),
(34, 4, 'sudafrica', 'si'),
(35, 4, 'egipto', 'si'),
(36, 4, 'ghana', 'si'),
(37, 4, 'costa de marfil', 'si'),
(38, 4, 'marruecos', 'si'),
(39, 5, 'japon', 'si'),
(40, 5, 'china', 'si'),
(41, 5, 'corea del sur', 'si'),
(42, 5, 'corea del norte', 'si'),
(43, 6, 'australia', 'si'),
(44, 6, 'nueva zelanda', 'si'),
(45, 6, 'tonga', 'si'),
(46, 6, 'islas fidji', 'si'),
(113, 1, 'honduras', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `id_region` int(5) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `active` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id_region`, `nombre`, `active`) VALUES
(1, 'america latina', 'si'),
(2, 'america del norte', 'si'),
(3, 'europa', 'si'),
(4, 'africa', 'si'),
(5, 'asia', 'si'),
(6, 'oceania', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `perfil` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `admin` varchar(100) NOT NULL,
  `active` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `perfil`, `pass`, `admin`, `active`) VALUES
(12, 'Roman', 'Riquelme', 'jromanriquelme@gmail.com', 'noadmin', '123', 'no', 'si'),
(13, 'Ignacio', 'Ninci', 'nachoninci@gmail.com', 'admin', '123', 'si', 'si');



--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contacto` int(100) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `compania` varchar(100) DEFAULT NULL,
  `id_region` varchar(100) NOT NULL,
  `id_pais` varchar(100) NOT NULL,
  `id_ciudad` int(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `active` varchar(100) NOT NULL,
  `id_usuario` int(100) NOT NULL
  -- FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contacto`, `fullname`, `cargo`, `email`, `compania`, `id_region`, `id_pais`, `id_ciudad`, `direccion`, `active`,`id_usuario`) VALUES
(1, 'Ignacio Ninci', 'gerente', 'nacho@gmail.com', 'amazon', '1', '1', 2, 'agusti 7485', 'si',13),
(2, 'pipa benedetto', 'vendedor', 'pipon@gmail.com', 'montesco', '1', '1', 2, 'guanama 1235', 'si',13),
(3, 'juan roman riquelme', 'tecnico en calidad', 'jrr10@gmail.com', 'prodec', '1', '1', 2, 'mocovies 879', 'si',12);
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  -- ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `id_pais` (`id_pais`);

--
-- Indices de la tabla `companias`
--
ALTER TABLE `companias`
  ADD PRIMARY KEY (`id_compania`),
  ADD KEY `id_pais` (`id_pais`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`),
  ADD KEY `id_region` (`id_region`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id_region`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `companias`
--
ALTER TABLE `companias`
  MODIFY `id_compania` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id_region` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `companias`
--
ALTER TABLE `companias`
  ADD CONSTRAINT `companias_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON UPDATE CASCADE,
  ADD CONSTRAINT `companias_ibfk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `paises`
--
-- ALTER TABLE `paises`
--   ADD CONSTRAINT `paises_ibfk_1` FOREIGN KEY (`id_region`) REFERENCES `regiones` (`id_region`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
