-- Alquifiestas — Seed Data para Desarrollo
-- Ejecutar después de crear las tablas y RLS policies

-- ============================================
-- CATEGORÍAS
-- ============================================
INSERT INTO categories (id, name, slug, description, icon) VALUES
('cat-sillas-mesas', 'Sillas y Mesas', 'sillas-y-mesas', 'Sillas Tiffany, Napoleón, plegables, mesas redondas, rectangulares y altas.', 'Armchair'),
('cat-inflables', 'Inflables', 'inflables', 'Castillos, resbaladeras, brincolines, combos y juegos acuáticos.', 'Castle'),
('cat-sonido-iluminacion', 'Sonido e Iluminación', 'sonido-e-iluminacion', 'DJ profesional, bafles, micrófonos, luces LED, pantallas y proyección.', 'Music'),
('cat-carpas-toldos', 'Carpas y Toldos', 'carpas-y-toldos', 'Carpas elegantes, toldos para exteriores, pabellones y cubiertas.', 'Tent'),
('cat-catering', 'Catering', 'catering', 'Banquetes completos, bufets, bocadillos, mesas de dulces y bebidas.', 'Utensils'),
('cat-decoracion', 'Decoración', 'decoracion', 'Arcos de globos, centros de mesa, cortinas, pistas de baile y backdrop.', 'Sparkles'),
('cat-fotografia-video', 'Fotografía y Video', 'fotografia-y-video', 'Fotógrafos profesionales, cabinas fotográficas, drones y videógrafos.', 'Camera'),
('cat-utensilios', 'Utensilios', 'utensilios', 'Vajillas, cristalería, cubiertos, ollas, dispensadores y calentadores.', 'Wine')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PROFILES / USERS (deben crearse vía Supabase Auth primero, luego insertar profiles)
-- Estos son IDs de ejemplo. En producción se crean automáticamente por trigger.
-- ============================================

-- ============================================
-- PROVEEDORES
-- ============================================
INSERT INTO providers (id, profile_id, business_name, description, location, department, latitude, longitude, is_verified, verification_documents) VALUES
('prov-1', '00000000-0000-0000-0000-000000000001', 'Eventos Elegantes GT', 'Más de 15 años organizando eventos inolvidables en Ciudad de Guatemala. Especialistas en sillas Tiffany y mesas decorativas.', 'Zona 10, Ciudad de Guatemala', 'Guatemala', 14.6349, -90.5069, true, '{"dpi": true, "licencia": true}'),
('prov-2', '00000000-0000-0000-0000-000000000002', 'Brinca Brinca Inflables', 'Los mejores inflables de Guatemala. Desde castillos pequeños hasta mega resbaladeras acuáticas.', 'Mixco, Guatemala', 'Guatemala', 14.6432, -90.5959, true, '{"dpi": true}'),
('prov-3', '00000000-0000-0000-0000-000000000003', 'DJ Carlos M. - Sonido Profesional', 'DJ con más de 10 años de experiencia en bodas, quinceañeras y eventos corporativos.', 'Zona 14, Ciudad de Guatemala', 'Guatemala', 14.585, -90.4905, true, '{"dpi": true}'),
('prov-4', '00000000-0000-0000-0000-000000000004', 'Carpas del Altiplano', 'Carpas elegantes para cualquier clima. Servicio en todo el altiplano guatemalteco.', 'Quetzaltenango', 'Quetzaltenango', 14.8529, -91.5326, true, '{"dpi": true}'),
('prov-5', '00000000-0000-0000-0000-000000000005', 'Banquetes Doña María', 'Comida guatemalteca auténtica para eventos. Kaq ik, pepián, tamales y más.', 'Antigua Guatemala, Sacatepéquez', 'Sacatepéquez', 14.5573, -90.7332, true, '{"dpi": true, "licencia_alimentos": true}'),
('prov-6', '00000000-0000-0000-0000-000000000006', 'Decorarte Quiché', 'Decoración única con toques maya. Arcos de globos, flores nativas y textiles tradicionales.', 'Santa Cruz del Quiché', 'Quiché', 15.0305, -91.1487, true, '{"dpi": true}'),
('prov-7', '00000000-0000-0000-0000-000000000007', 'FotoMaya Estudio', 'Fotografía profesional con visión maya. Bodas, quinceañeras, eventos corporativos.', 'Zona 1, Ciudad de Guatemala', 'Guatemala', 14.6419, -90.5133, true, '{"dpi": true}'),
('prov-8', '00000000-0000-0000-0000-000000000008', 'Vajillas de Lujo Xela', 'Vajillas de cristal, porcelana y acero inoxidable. Servicio de meseros incluido.', 'Quetzaltenango', 'Quetzaltenango', 14.8353, -91.5187, true, '{"dpi": true}'),
('prov-9', '00000000-0000-0000-0000-000000000009', 'Mega Sonido Huehue', 'Sonido potente para eventos grandes y pequeños en Huehuetenango. Karaoke, luces LED.', 'Huehuetenango', 'Huehuetenango', 15.3193, -91.4724, false, '{"dpi": false}'),
('prov-10', '00000000-0000-0000-0000-000000000010', 'Catering Petén Selva', 'Catering con ingredientes de la selva petenera. Exótico, fresco y delicioso.', 'Flores, Petén', 'Petén', 16.9234, -89.8867, true, '{"dpi": true}')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PRODUCTOS
-- ============================================
INSERT INTO products (id, provider_id, category_id, name, description, price_gtq, price_usd, unit, images, is_active) VALUES
('prod-1', 'prov-1', 'cat-sillas-mesas', 'Silla Tiffany Dorada', 'Silla estilo Tiffany con cojín blanco. Ideal para bodas, bautizos y eventos formales.', 55, 7, 'unidad', '{"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop"}', true),
('prod-2', 'prov-1', 'cat-sillas-mesas', 'Mesa Redonda 10 Personas', 'Mesa redonda con mantel incluido. Capacidad para 10 comensales.', 350, 45, 'unidad', '{"https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop"}', true),
('prod-3', 'prov-1', 'cat-sillas-mesas', 'Silla Plegable Blanca', 'Silla plegable resistente, ideal para eventos al aire libre.', 18, 2.30, 'unidad', '{"https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&h=400&fit=crop"}', true),
('prod-4', 'prov-2', 'cat-inflables', 'Castillo Inflable Mediano', 'Castillo con tobogán integrado. 4x4 metros. Para niños de 3 a 10 años.', 800, 102, '4 horas', '{"https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"}', true),
('prod-5', 'prov-2', 'cat-inflables', 'Resbaladera Acuática Mega', 'Resbaladera acuática de 8 metros de alto. Incluye inflador y extensión.', 1200, 153, '4 horas', '{"https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop"}', true),
('prod-6', 'prov-3', 'cat-sonido-iluminacion', 'Paquete DJ Básico', 'DJ profesional + 2 bafles JBL + mezclador Pioneer. 4 horas de servicio.', 2500, 319, 'evento', '{"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop"}', true),
('prod-7', 'prov-3', 'cat-sonido-iluminacion', 'Paquete DJ Premium + Luces', 'DJ + 4 bafles + subwoofer + luces LED robotizadas + máquina de humo.', 4500, 574, 'evento', '{"https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=400&fit=crop"}', true),
('prod-8', 'prov-9', 'cat-sonido-iluminacion', 'Karaoke + Pantalla Gigante', 'Máquina de karaoke con 10,000 canciones + pantalla 85\" + 2 micrófonos inalámbricos.', 1500, 191, '4 horas', '{"https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600&h=400&fit=crop"}', true),
('prod-9', 'prov-4', 'cat-carpas-toldos', 'Carpa Elegante 5x5m', 'Carpa con piso de madera, iluminación interior y cortinas laterales. 25 personas.', 1800, 230, 'unidad', '{"https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop"}', true),
('prod-10', 'prov-4', 'cat-carpas-toldos', 'Toldo Para Exteriores 6x3m', 'Toldo resistente a lluvia y viento. Ideal para jardines y patios.', 950, 121, 'unidad', '{"https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=400&fit=crop"}', true),
('prod-11', 'prov-5', 'cat-catering', 'Buffet Guatemalteco Completo', 'Pepián, kaq ik, tamales, arroz, tortillas hechas a mano, refrescos naturales. 50 personas.', 5500, 701, '50 personas', '{"https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop"}', true),
('prod-12', 'prov-5', 'cat-catering', 'Mesa de Dulces Tradicional', 'Canillos de leche, cocadas, dulces de ayote, champurradas, atol de elote. Decoración incluida.', 1200, 153, 'evento', '{"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop"}', true),
('prod-13', 'prov-10', 'cat-catering', 'Banquete Selva Petenera', 'Pescado fresco del lago, frutas tropicales, chaya, tamales de chipilín. 30 personas.', 4200, 535, '30 personas', '{"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop"}', true),
('prod-14', 'prov-6', 'cat-decoracion', 'Arco de Globos Temático', 'Arco orgánico de globos en colores a elección. 3 metros de ancho.', 850, 108, 'unidad', '{"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop"}', true),
('prod-15', 'prov-6', 'cat-decoracion', 'Centro de Mesa Maya', 'Centro de mesa con flores nativas, textiles tradicionales y velas artesanales. 10 piezas.', 650, 83, '10 unidades', '{"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop"}', true),
('prod-16', 'prov-7', 'cat-fotografia-video', 'Paquete Fotografía Boda', '8 horas de cobertura. 2 fotógrafos. 500+ fotos editadas. Álbum digital y físico.', 8500, 1083, 'evento', '{"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop"}', true),
('prod-17', 'prov-7', 'cat-fotografia-video', 'Cabina Fotográfica FunBox', 'Cabina fotográfica con accesorios, impresión instantánea y galería digital. 4 horas.', 1800, 230, '4 horas', '{"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop"}', true),
('prod-18', 'prov-8', 'cat-utensilios', 'Vajilla de Porcelana Completa', 'Plato base, plato fuerte, plato postre, taza y saucer. 50 servicios. Incluye lavado.', 2200, 280, '50 servicios', '{"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop"}', true),
('prod-19', 'prov-8', 'cat-utensilios', 'Cristalería Elegante', 'Copas de vino, agua, champagne y whiskey. 50 piezas de cada tipo.', 1500, 191, '200 piezas', '{"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop"}', true),
('prod-20', 'prov-8', 'cat-utensilios', 'Dispensador de Agua 20L', 'Dispensador de acero inoxidable con capacidad para 20 litros. Incluye base.', 120, 15, 'unidad', '{"https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop"}', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- EXCHANGE RATES (Banguat reference)
-- ============================================
INSERT INTO exchange_rates (id, rate, source) VALUES
('xr-2026-06-07', 7.85, 'banguat')
ON CONFLICT (id) DO NOTHING;
