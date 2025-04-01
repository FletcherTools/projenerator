# Projenerator
Template-based boilerplate code generator

## 1. Create a config file
Create a `.projenerator` directory inside your project and add a projenerator config file.

**.projenerator/config.json**
```
{
  "targetDir": "../src",
}
```

## 2. Add templates
Add handlebars templates inside `.projenerator/templates` directory

**You can use handlebars templates syntax inside both directories/files names and it's content**

You will have `entityName` and `entityNamePlural` variables available in your template's context, 
but **avoid using them as they are**, **ensure they have a proper casing** by combining them with case-transform helpers: 
`camel`, `pascal`, `kebab`, `snake`, `upper-snake` and `upper`

```handlebars
{{entityName}}
{{entityNamePlural}}

{{camel entityName}} // entityName
{{pascal entityName}} // EntityName
{{kebab entityName}} // entity-name
{{snake entityName}} // entity_name

{{upper (snake entityName)}} // ENTITY_NAME
{{upper-snake entityName}} // ENTITY_NAME
```
**Example .projenerator directory structure:**
```handlebars
.projenerator
    - config.json
    - templates
        - component
            - {{pascal entityName}}
                - {{camel entityName}}.module.scss.hbs
                - {{pascal entityName}}.tsx.hbs
                - index.ts.hbs
            - {{pascal entityName}}--extended // --variant=extended
                - {{camel entityName}}.module.scss.hbs
                - {{pascal entityName}}Context.tsx.hbs
                - {{pascal entityName}}.tsx.hbs
                - index.ts.hbs
        - helper
          - {{camel entityName}}.helper.ts.hbs
```

## 3. Generate code
Use `make` command to generate a boilerplate code
```
# projenerator make entity-type entity-name
projenerator make component test-component
```
**Pass additional options to have more control over the generation process**
```
projenerator make component person --plural=people --variant=extended --scope=features/user
```

### Make command structure:
```
projenerator make
    <entity-type> // Entity type
    <entity-name> // Entity name
    -p, --plural <plural> // Entity plural name
    -v, --variant <variant> // Variant modifier
    -s, --scope <scope> // Scope modifier (pass relative target path for a generated enitity)
```
