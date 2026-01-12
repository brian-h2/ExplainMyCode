# 🧠 Explain My Code

Un mini--proyecto pensado para una cosa muy simple:\
**pegar código y entenderlo mejor.**

La idea es tener una interfaz liviana donde se pueda:

-   Pegar cualquier fragmento de código\
-   Enviarlo a una IA\
-   Recibir una explicación clara\
-   Detectar posibles problemas\
-   Obtener sugerencias de mejora

Ideal para aprender, revisar código viejo, entender snippets ajenos o simplemente validar lo que se escribio.

------------------------------------------------------------------------

## 🎯 Objetivo

Crear una herramienta sencilla, barata y rápida que:

-   Ayude a comprender código en segundos\
-   Funcione como asistente de estudio\
-   Sirva como base para futuras features (exportar, guardar, compartir,
    etc.)\
-   Sea un playground real para experimentar con IA + frontend moderno

------------------------------------------------------------------------

## 🛠 Tecnologías

-   **Next.js (App Router)**
-   **React**
-   **TypeScript**
-   **Tailwind CSS**
-   **API Route (`/api/explain`)**
-   **LLM (IA) vía API externa**
-   **Arquitectura Server / Client Components**

------------------------------------------------------------------------

## 🧩 Arquitectura

``` text
UI (Client Component)
        |
        v
/api/explain (Route Handler - Server)
        |
        v
explainCode()
        |
        v
LLM (IA)
        |
        v
Parser / Validator
        |
        v
ExplainResult (JSON tipado)
        |
        v
UI renderiza resultado
```

-   El frontend solo se encarga de UX + estado.
-   La API recibe el código, llama a la IA y devuelve un
    `ExplainResult`.
-   La respuesta cruda del modelo se valida, se parsea y se transforma.
-   El cliente nunca habla directo con la IA (seguridad + control).

------------------------------------------------------------------------

## 🧪 Estado actual

-   UI funcional\
-   Endpoint conectado a IA real\
-   Parsing y validación de respuesta\
-   Manejo de errores\
-   Flujo completo end-to-end


