const OpenAPISnippet = require('openapi-snippet')

fetch("http://localhost:8081/api-docs-json")
    .then(respuesta => respuesta.json())
        .then(dato => {
            // define input:
            const openApi = dato // Open API document
            const targets = ['javascript-xhr'] // array of targets for code snippets. See list below...

            try {
            // either, get snippets for ALL endpoints:
            // const results = OpenAPISnippet.getSnippets(openApi, targets) // results is now array of snippets, see "Output" below.

            // ...or, get snippets for a single endpoint:
            const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/estudiante', 'get', targets)
            console.log(results2);
            } catch (err) {
                console.log("Ha ocurrido un incidente: " + err);
            }
        });