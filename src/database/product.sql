CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    slogan VARCHAR(255),
    description TEXT,
    category VARCHAR(50),
    default_price INTEGER NOT NULL
);

CREATE TABLE product_features (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    feature VARCHAR(100),
    value VARCHAR(100)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    name VARCHAR(100),
    sale_price VARCHAR(20),
    original_price VARCHAR(20),
    default? BOOLEAN
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE skus (
    id SERIAL PRIMARY KEY,
    style_id INTEGER,
    quantity INTEGER
    size VARCHAR(20),
    FOREIGN KEY (style_id) REFERENCES styles(id)
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    style_id INTEGER,
    url TEXT,
    thumbnail_url TEXT
    FOREIGN KEY (style_id) REFERENCES styles(id)
);


CREATE TABLE related_products (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    related_product_id INTEGER NOT NULL
    FOREIGN KEY (product_id) REFERENCES products(id)
    FOREIGN KEY (related_product_id) REFERENCES products(id)
);