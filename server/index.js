//Dependecies
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Importar el módulo fs para trabajar con el sistema de archivos

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
//Server

app.listen(3002, () => {
  console.log("server running");
});

//DataBase

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "nicosorteos",
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("conected");
  }
});
//Route to the server

app.post("/register", (req, res) => {
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  //SQL statement

  const sql = "INSERT INTO users (email, username, password) VALUES (?,?,?)";

  const values = [sentEmail, sentUserName, sentPassword];

  //Query
  db.query(sql, values, (err, results) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log("User Inserted");
      res.send({ message: "User added!" });
    }
  });
});

//Login

app.post("/login", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentloginPassword = req.body.LoginPassword;

  //SQL statement

  const sql = "SELECT * FROM users WHERE username = ? && password = ?";

  const values = [sentloginUserName, sentloginPassword];
  db.query(sql, values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: "Usuario o contraseña incorrectos" });
    }
  });
});

//Get Sorteos

app.get("/sorteos", (req, res) => {
  const sql = "SELECT * FROM concursos";

  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put("/sorteos/:idSorteo/actualizar-estado", (req, res) => {
  const idSorteo = req.params.idSorteo;
  const ganador = req.body.ganador; // Se obtiene el nombre del ganador desde el cuerpo de la solicitud
  
  const sql = `
    UPDATE concursos
    SET estatus = 4,
        ganador = ?
    WHERE idconcursos = ?;
  `;
  
  db.query(sql, [ganador, idSorteo], (err, result) => {
    if (err) {
      console.error("Error al actualizar el estado del sorteo:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Sorteo no encontrado" });
    }
    
    return res.status(200).json({ message: "Estado del sorteo actualizado correctamente" });
  });
});

const upload = multer({ dest: "uploads/" }); // Directorio donde se guardarán los archivos

app.post("/create", upload.single("Imagen"), (req, res) => {
  const nombre = req.body.Nombre;
  const descripcion = req.body.Descripcion;
  const imagenPath = req.file.path.replace("uploads\\", "/"); // Obtener la ruta relativa del archivo subido
  const estado = req.body.Estado;
  const timestamp = Date.now();
  const fechaCreacion = new Date(timestamp)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // SQL statement
  const sql =
    "INSERT INTO concursos (nombre, descripcion, imagen, estatus, fecha_creacion) VALUES (?,?,?,?,?)";
  const values = [nombre, descripcion, imagenPath, estado, fechaCreacion];

  //Query
  db.query(sql, values, (err, results) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log("Sorteo inserted");
      res.send({ message: "Sorteo creado correctamente!" });
    }
  });
});

// Ruta para obtener la imagen binaria por su nombre de archivo
app.get("/uploads/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  res.sendFile(path.join(__dirname, "uploads", fileName));
});

app.put("/update/:id", upload.single("Imagen"), (req, res) => {
  const id = req.params.id;
  const nombre = req.body.Nombre;
  const descripcion = req.body.Descripcion;
  let imagenPath = ""; // Inicializar la variable de la ruta de la imagen

  // Construir la consulta SQL dinámicamente según los campos proporcionados en la solicitud
  let sql = "UPDATE concursos SET";
  const updateFields = []; // Array para almacenar los campos a actualizar

  // Verificar si se proporcionó el nombre en la solicitud
  if (nombre) {
    updateFields.push(" nombre = ?");
  }
  // Verificar si se proporcionó la descripción en la solicitud
  if (descripcion) {
    updateFields.push(" descripcion = ?");
  }
  // Verificar si se subió una nueva imagen
  if (req.file) {
    imagenPath = req.file.path.replace("uploads\\", "/");
    updateFields.push(" imagen = ?");
  }

  // Verificar si se proporcionó al menos un campo para actualizar
  if (updateFields.length > 0) {
    sql += updateFields.join(",") + " WHERE idconcursos = ?";
    const values = [
      ...(nombre ? [nombre] : []),
      ...(descripcion ? [descripcion] : []),
      ...(imagenPath ? [imagenPath] : []),
      id,
    ];

    // Ejecutar la consulta SQL con los valores dinámicos
    db.query(sql, values, (err, results) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        console.log("Sorteo actualizado");
        res.send({ message: "Sorteo actualizado correctamente!" });
      }
    });
  } else {
    // Si no se proporciona ningún campo para actualizar, devolver un error
    res
      .status(400)
      .send({ error: "Debe proporcionar al menos un campo para actualizar." });
  }
});

// Ruta para obtener los datos de un sorteo por su ID
app.get("/sorteos/:id", (req, res) => {
  const idSorteo = req.params.id;
  const sql = "SELECT * FROM concursos WHERE idconcursos = ?";

  db.query(sql, [idSorteo], (err, result) => {
    if (err) {
      console.error("Error al obtener los datos del sorteo:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      if (result.length > 0) {
        // La consulta devuelve un resultado
        const sorteo = result[0];
        res.json(sorteo);
      } else {
        // No se encontró ningún sorteo con el ID proporcionado
        res.status(404).send("Sorteo no encontrado");
      }
    }
  });
});


app.delete("/eliminarsorteo/:id", (req, res) => {
  const idSorteo = req.params.id;
  // SQL statements
  const sqlSelectImage = "SELECT imagen FROM concursos WHERE idconcursos = ?";
  const sqlDeleteBoletos = "DELETE FROM boletos WHERE id_concursos = ?";
  const sqlDeleteSorteo = "DELETE FROM concursos WHERE idconcursos = ?";

  // Obtener la ruta de la imagen antes de eliminar los datos del sorteo
  db.query(sqlSelectImage, idSorteo, (selectErr, selectResults) => {
    if (selectErr) {
      console.error("Error al obtener la ruta de la imagen:", selectErr);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    // Verificar si se encontró la imagen en la base de datos
    if (selectResults.length > 0) {
      const imagePath = selectResults[0].imagen; // Ruta de la imagen
      // Eliminar la imagen del sistema de archivos
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error al eliminar la imagen del sistema de archivos:", unlinkErr);
          // No se detiene la eliminación del sorteo y los boletos si falla la eliminación de la imagen
        } else {
          console.log("Imagen eliminada correctamente");
        }
        // Eliminar los boletos asociados al sorteo
        db.query(sqlDeleteBoletos, idSorteo, (deleteBoletosErr, deleteBoletosResults) => {
          if (deleteBoletosErr) {
            console.error("Error al eliminar los boletos:", deleteBoletosErr);
            return res.status(500).json({ error: "Error interno del servidor" });
          }
          // Eliminar el sorteo una vez que se han eliminado los boletos y la imagen
          db.query(sqlDeleteSorteo, idSorteo, (deleteSorteoErr, deleteSorteoResults) => {
            if (deleteSorteoErr) {
              console.error("Error al eliminar el sorteo:", deleteSorteoErr);
              return res.status(500).json({ error: "Error interno del servidor" });
            }
            console.log("Sorteo, imagen y boletos asociados eliminados correctamente");
            return res.status(200).json({ message: "Sorteo, imagen y boletos asociados eliminados correctamente" });
          });
        });
      });
    } else {
      console.error("La imagen no fue encontrada en la base de datos");
      // No se detiene la eliminación del sorteo y los boletos si no se encuentra la imagen
      // Eliminar los boletos asociados al sorteo
      db.query(sqlDeleteBoletos, idSorteo, (deleteBoletosErr, deleteBoletosResults) => {
        if (deleteBoletosErr) {
          console.error("Error al eliminar los boletos:", deleteBoletosErr);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
        // Eliminar el sorteo una vez que se han eliminado los boletos
        db.query(sqlDeleteSorteo, idSorteo, (deleteSorteoErr, deleteSorteoResults) => {
          if (deleteSorteoErr) {
            console.error("Error al eliminar el sorteo:", deleteSorteoErr);
            return res.status(500).json({ error: "Error interno del servidor" });
          }
          console.log("Sorteo y boletos asociados eliminados correctamente");
          return res.status(200).json({ message: "Sorteo y boletos asociados eliminados correctamente" });
        });
      });
    }
  });
});


//Ruta para obtener los sorteos activos con su respecitvo número de boletos pendientes por pagar
app.get("/sorteos-boletos", (req, res) => {
  // SQL statement to join concursos and boletos tables and get the required data
  const sql = `
        SELECT c.idconcursos AS idSorteo, c.nombre AS nombreSorteo, COUNT(b.idboletos) AS cantidadBoletosEstado2
        FROM concursos c
        LEFT JOIN boletos b ON c.idconcursos = b.id_concursos AND b.estado = 2
        WHERE c.estatus = 1
        GROUP BY c.idconcursos;
    `;

  // Query the database
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los sorteos y boletos:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Send the results as JSON
      res.json(results);
    }
  });
});

//Ruta para obtener boletos pendientes por sorteo
app.get("/boletos/:idSorteo", (req, res) => {
  const idSorteo = req.params.idSorteo;
  // SQL statement to select all ticket data based on the given sorteo number
  const sql = "SELECT * FROM boletos WHERE id_concursos = ? AND estado = 2";

  // Query the database
  db.query(sql, [idSorteo], (err, results) => {
    if (err) {
      console.error("Error al obtener los boletos:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Send the results as JSON
      res.json(results);
    }
  });
});

// Ruta para obtener información del boleto y el nombre del concurso
app.get("/boletoinfo/:idBoleto", (req, res) => {
  const idBoleto = req.params.idBoleto;
  // SQL statement to select ticket data and corresponding contest name based on the given ticket ID
  const sql =
    "SELECT b.idboletos, b.id_concursos, b.num_boleto, b.estado, b.comprador, c.nombre AS nombre_concurso FROM boletos b JOIN concursos c ON b.id_concursos = c.idconcursos WHERE b.idboletos = ?";

  // Query the database
  db.query(sql, [idBoleto], (err, results) => {
    if (err) {
      console.error("Error al obtener la información del boleto:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      if (results.length === 0) {
        res.status(404).send("Boleto no encontrado");
      } else {
        // Send the results as JSON
        res.json(results[0]); // Solo devolvemos el primer resultado ya que debería ser único
      }
    }
  });
});

// Ruta para liberar un boleto
app.delete("/boleto-liberar/:idBoleto", (req, res) => {
  const idBoleto = req.params.idBoleto;

  // Realizar la eliminación del boleto de la base de datos
  const sql = "DELETE FROM boletos WHERE idboletos = ?";

  db.query(sql, [idBoleto], (err, results) => {
    if (err) {
      console.error("Error al liberar el boleto:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).send("El boleto ha sido liberado exitosamente");
    }
  });
});

// Ruta para vender un boleto con nombre de comprador
app.put("/boleto-vendido/:idBoleto", (req, res) => {
  const idBoleto = req.params.idBoleto;
  const { comprador } = req.body; // Obtener el nombre del comprador del cuerpo de la solicitud
  const timestamp = Date.now();
  const fechaCreacion = new Date(timestamp)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Realizar la actualización del estado del boleto a "Vendido" (valor 3) y guardar el nombre del comprador
  const sql =
    "UPDATE boletos SET estado = ?, comprador = ?, fecha_venta = ? WHERE idboletos = ?";
  const nuevoEstado = 3; // Cambiar a 3

  db.query(
    sql,
    [nuevoEstado, comprador, fechaCreacion, idBoleto],
    (err, results) => {
      if (err) {
        console.error("Error al vender el boleto:", err);
        res.status(500).send("Error interno del servidor");
      } else {
        res.status(200).send("El boleto ha sido vendido exitosamente");
      }
    }
  );
});

//Ruta para obtener los sorteos activos con su respecitvo número de boletos pendientes por pagar
app.get("/sorteos-boletos-vendidos", (req, res) => {
  // SQL statement to join concursos and boletos tables and get the required data
  const sql = `
        SELECT c.idconcursos AS idSorteo, c.nombre AS nombreSorteo, COUNT(b.idboletos) AS cantidadBoletosEstado2
        FROM concursos c
        LEFT JOIN boletos b ON c.idconcursos = b.id_concursos AND b.estado = 3
        WHERE c.estatus = 1
        GROUP BY c.idconcursos;
    `;

  // Query the database
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los sorteos y boletos:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Send the results as JSON
      res.json(results);
    }
  });
});

//Ruta para obtener boletos vendidos por sorteo con nombre de concurso
app.get("/boletos-vendidos/:idSorteo", (req, res) => {
  const idSorteo = req.params.idSorteo;
  // SQL statement to select tickets with state 3 and join with the concursos table to get the name of the concurso
  const sql =
    "SELECT boletos.*, concursos.nombre AS nombre_concurso FROM boletos INNER JOIN concursos ON boletos.id_concursos = concursos.idconcursos WHERE boletos.id_concursos = ? AND boletos.estado = 3";

  // Query the database
  db.query(sql, [idSorteo], (err, results) => {
    if (err) {
      console.error("Error al obtener los boletos vendidos:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Send the results as JSON
      res.json(results);
    }
  });
});

//Obtener los 4 sorteos más recientes para mostrar en el dashboard
app.get("/sorteos-recientes", (req, res) => {
  // SQL statement para seleccionar los 4 sorteos más recientes
  const sql =
    "SELECT idconcursos, nombre, descripcion, imagen, estatus, fecha_creacion FROM concursos ORDER BY fecha_creacion DESC LIMIT 4";

  // Consultar la base de datos
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los sorteos más recientes:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Enviar los resultados como JSON
      res.json(results);
    }
  });
});

// Ruta para obtener los detalles del concurso con más boletos vendidos
app.get("/concurso-mas-vendidos", (req, res) => {
  // Consulta SQL para obtener el nombre, la imagen y el número de boletos del concurso con más boletos vendidos
  const sql = `
        SELECT c.nombre, c.imagen, COUNT(b.idboletos) AS numero_boletos_vendidos,
               DATEDIFF(CURRENT_DATE(), c.fecha_creacion) AS dias_activos
        FROM concursos c
        INNER JOIN boletos b ON c.idconcursos = b.id_concursos
        WHERE b.estado = 3 -- Filtrar boletos vendidos
        GROUP BY c.idconcursos
        ORDER BY numero_boletos_vendidos DESC
        LIMIT 1; -- Limitar a 1 para obtener solo el concurso con más boletos vendidos
    `;

  // Ejecutar la consulta en la base de datos
  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "Error al obtener el concurso con más boletos vendidos:",
        err
      );
      res.status(500).send("Error interno del servidor");
    } else {
      // Enviar los resultados como JSON
      res.json(results[0]); // Devuelve solo el primer resultado (el concurso con más boletos vendidos)
    }
  });
});

// Ruta para obtener los datos del concurso más reciente
app.get("/concurso-mas-reciente", (req, res) => {
  // SQL statement para obtener el concurso más reciente ordenado por fecha de creación descendente
  const sql = `
        SELECT *, DATEDIFF(CURRENT_DATE(), fecha_creacion) AS dias_activos
        FROM concursos
        ORDER BY fecha_creacion DESC
        LIMIT 1
    `;

  // Query a la base de datos para obtener el concurso más reciente
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener el concurso más reciente:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Si hay resultados, enviar el concurso más reciente como JSON
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        // Si no hay resultados, enviar un mensaje de error
        res.status(404).send("No se encontraron concursos");
      }
    }
  });
});

// Ruta para obtener la cantidad de boletos vendidos hoy y en todo el mes
app.get("/boletos-vendidos-estadistica", (req, res) => {
  // Obtener la fecha actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11
  const currentDay = currentDate.getDate();

  // Obtener la cantidad de boletos vendidos hoy
  const sqlToday = `
        SELECT COUNT(*) AS boletos_vendidos_hoy
        FROM boletos
        WHERE DATE(fecha_venta) = '${currentYear}-${currentMonth}-${currentDay}'
    `;

  // Obtener la cantidad de boletos vendidos este mes
  const sqlMonth = `
        SELECT COUNT(*) AS boletos_vendidos_mes
        FROM boletos
        WHERE YEAR(fecha_venta) = '${currentYear}' AND MONTH(fecha_venta) = '${currentMonth}'
    `;

  // Ejecutar las consultas en paralelo
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(sqlToday, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].boletos_vendidos_hoy);
        }
      });
    }),
    new Promise((resolve, reject) => {
      db.query(sqlMonth, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].boletos_vendidos_mes);
        }
      });
    }),
  ])
    .then(([boletosVendidosHoy, boletosVendidosMes]) => {
      // Enviar los resultados como JSON
      res.json({
        boletos_vendidos_hoy: boletosVendidosHoy,
        boletos_vendidos_mes: boletosVendidosMes,
      });
    })
    .catch((error) => {
      console.error("Error al obtener la cantidad de boletos vendidos:", error);
      res.status(500).send("Error interno del servidor");
    });
});

// Ruta para obtener los últimos 4 boletos apartados
app.get("/ultimos-boletos-apartados", (req, res) => {
  // Consulta SQL para obtener los últimos 4 boletos que están en estado 2 (apartados)
  const sql = `
  SELECT 
  boletos.*,
  concursos.nombre AS nombre_concurso,
  TIMESTAMPDIFF(MINUTE, boletos.fecha_apartado, NOW()) AS tiempo_transcurrido_minutos
FROM boletos
INNER JOIN concursos ON boletos.id_concursos = concursos.idconcursos
WHERE boletos.estado = 2 
AND boletos.fecha_apartado IS NOT NULL -- Excluir registros con fecha_apartado nulo
ORDER BY boletos.fecha_apartado DESC
LIMIT 4;


    `;

  // Ejecutar la consulta en la base de datos
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los últimos boletos apartados:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      // Enviar los resultados como JSON
      console.log(results);
      res.json(results);
    }
  });
});



//Ruta para obtener estados de boletos vendidos y apartados
app.get("/listado-boletos/:idSorteo", (req, res) => {
  const idSorteo = req.params.idSorteo;
  const sql = `
    SELECT num_boleto, estado FROM boletos WHERE id_concursos = ?;
  `;

  db.query(sql, [idSorteo], (err, results)  => {
    if (err) {
      console.error("Error al obtener los boletos:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      res.json(results); // Enviar los boletos como JSON
    }
  });
});


//Ruta apartar boletos seleccionados 

app.post("/apartar-boletos", (req, res) => {
  const { id_concurso, num_boleto } = req.body;
  const timestamp = Date.now();
  const fechaCreacion = new Date(timestamp)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  // Inserta los datos en la base de datos
  const sql = `
    INSERT INTO boletos (id_concursos, num_boleto, estado, fecha_apartado) VALUES (?, ?, 2,?);
  `;
  //Query
  db.query(sql, [id_concurso, num_boleto,fechaCreacion], (err, results) => {
    if (err) {
      console.error("Error al apartar el boleto:", err);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).send("Boleto apartado exitosamente");
    }
  });
});