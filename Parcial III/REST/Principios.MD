# <center> **API-REST - Evaluación U. IV**
## <center>Jafet Anselmo Sena Ramos - #20100264
# <center>***Principios De La Arquitectura API-Rest***  </center>
## **REST**.
  
**REST** (**Re**presentational **S**tate **T**ransfer) es una arquitectura para el diseño de APIs sobre el protocolo HTTP. La arquitectura del estilo REST principalmente define reglas, comportamiento y restricciones sobre el funcionamiento de una API. Mencionando que, todas las APIs que siguen esta arquitectura son conocidas o llamadas como “API RESTful”. El surgimiento de REST fue el año 2000, descrito en la tesis de Roy Fielding, padre de la especificación HTTP.

## **Principios De Diseño REST**
- **Cliente-Servidor:** El cliente y el servidor deben estar completamente separados e independientes. La única forma de comunicación debe ser mediante solicitudes *HTTP*.
- **Sin Estado (*stateless*):** La comunicación entre cliente-servidor debe ser sin estado, lo cual implica que no se almacenará ni se compartirá información entre peticiones. Toda petición es independiente y debe contener sólo la información necesaria para procesarla.
- **Identificador Único (URI):** Todo recurso debe tener un identificador irrepetible, no puede existir dos o más recursos con el mismo identificador en la red y estos deben mantener una jerarquía lógica.
- **Uso Correcto DE HTTP:** REST debe respetar tanto los verbos como los códigos de estado para cada operación (*GET, POST, PUT, DELETE, PATCH, etc.*).  
- **Interfaz Uniforme:** La interfaz de basa en recursos \[por ejemplo el recurso Empleado (Id, Nombre, Apellido, Puesto, Sueldo)\]. El servidor mandará los datos (vía html, json, xml...) pero lo que tenga en su interior (BBDD por ejemplo) para el cliente es transparente. La representación del recurso que le llega al cliente, será suficiente para poder cambiar/borrar el recurso:  
  - Suponiendo que tenga permisos.  
  - Por eso en el recurso solicitado se suele enviar un parámetro Id  
- **Cacheable:** En la web, los clientes pueden cachear las respuestas del servidor, y dichas respuestas se deben marcar de forma implícita o explícita como cacheables o no. En futuras peticiones, el cliente sabrá si puede reutilizar o no los datos que ya ha obtenido. Si ahorramos peticiones, mejoraremos la escabilidad de la aplicación y el rendimiento en cliente (evitamos principalmente la latencia).
## **Reglas De Diseño REST**  
Siguiendo los principios y comportamientos definidos en los libros *REST API Desgin Rulebook* y *RESTful web API Handbook*, las principales reglas son las siguientes:  
### *Uso correcto de verbos y código de estado HTTP*.  
Se sugiere usar un verbo HTTP específico dependiendo de la particularidad de la llamada, respetando tanto los verbos como los códigos de estado para cada operación.    
***Verbos utilizados dependiendo de la acción realizada en el servidor***
| **MÉTODO** | **<center>ACCIÓN</center>**                   |
|:----------:|-----------------------------------------------|
|**GET**     |Solicita información de recursos.              |
|**POST**    |Creación de nuevos recursos.                   |
|**PUT**     |Actualiza un recurso existente en su totalidad.|
|**PATCH**   |Actualiza un recurso existente parcialmente.   |
|**DELETE**  |Elimina un recurso existente.                  |    
--------------------------------------------------------------

***Códigos de estado utilizados correctamente dependiendo de la situación***
|**ESTADO**  |**<center>DESCRIPCIÓN</center>**|
|:----------:|--------------------------------|
|**1XX**     |Respuestas informativas.        |
|**2XX**     |Peticiones correctas.           |
|**3XX**     |Redirecciones.                  |
|**4XX**     |Errores del cliente.            |
|**5XX**     |Errores del servidor.           |  
---------------------------------------  
***Códigos de estado más utilizados***
* **200 (OK):** *La solicitud ha sido recibida, entendida y procesada correctamente.*
* **201 (Created):** *La solicitud se procesó correctamente y generó un nuevo recurso en el proceso.*
* **400 (Bad Request):** *Solicitud no apropiada, faltan requisitos para ser válida.*
* **401 (Unauthorized):** *No autorizado credenciales inválidas.*
* **403 (Forbidden):** *Prohibido credenciales insuficientes, no tiene permisos para acceder.*
* **404 (Not Found):** *Recurso No Encontrado.*
* **500 (Internal Server Error):** *Hubo un error en el servidor y la solicitud no pudo ser completada.*
### *Uso de sustantivos en puntos finales y nombres en plural*.  
En el correcto diseño de una API del estilo REST, se considera utilizar sustantivos y nombres en plural en nuestros puntos finales y **NO** verbos de acción, esto es básicamente porqué la acción ya está determinada en los verbos de HTTP.  
***Incorrecto***  ❌
~~~
POST https://api.com/v1/createUser
~~~  
***Correcto***  ✅
~~~
POST https://api.com/v1/users
~~~
### *Uso correcto de filtrado, clasificación y paginación*.  
Para realizar las operaciones de filtrado, clasificación y paginación en nuestra API REST, lo debemos hacer mediante **Query Strings**. Las Query Strings o cadenas de consultas son un término que se utiliza para hacer referencia a una interacción adicional sobre un recurso o base de datos. A continuación algunas referencias y estandarizaciones para algunas acciones:  
#### **Filtrado de recursos**  
~~~
GET https://api.com/v1/users?first_name=diego&last_name=cortes
~~~
#### **Orden de recursos**  
~~~
GET https://api.com/v1/users?sort=username&order=desc
~~~
#### **Paginación de recursos**  
~~~
GET https://api.com/v1/users?offset=50&limit=50
~~~
#### **Buscador de resultados**  
~~~
GET https://api.com/v1/users?q=diego
~~~
#### **Buscador de campos específicos**  
~~~
GET https://api.com/v1/users?fields=first_name,last_name
~~~  
## **Seguridad En API REST**  
REST está construido sobre el protocolo HTTP y la seguridad sobre este mismo es compartida. Las directrices que se aplican a todas las APIs basadas en HTTP para el uso seguro son las siguientes:   
1. **Utilización de cupos y límites:** Se deben establecer cupos defrecuencia con la que se puederecurrir a toda API en conjuntode seguimiento e historial de uso.   
2. **Utilización de puertas de enlaces:** Se pueden utilizarpuertas de enlaces paraestablecer puntos principales decontrol de tráfico de nuestrasAPIs. Las puertas de enlacespermitirán autenticar el tráfico,controlar y analizar el uso delas APIs.  
3. **Uso de HTTPS (*Hypertext Transfer Protocol Secure*):** Creación deconexiones segura y cifrada entreun cliente y servidor.  
4. **Implementación de autenticación y autorización:** Se debe implementarcapas de seguridad extra para laidentificación de clientes en lasolicitud de todos recursos.  
# Referencias Bibliográficas  
* <https://medium.com/@diego.coder/introducci%C3%B3n-a-las-apis-rest-6b3ad900acc9>  
* <https://juanda.gitbooks.io/webapps/content/api/arquitectura-api-rest.html>