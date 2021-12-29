export const SliderData =   [
  {
      "_id":  "6187df233b2a467cc61dfa26",
      "var": "gender",
      "description": "Monto de dinero generado mensualmente",
      "value_type": "cat_closed",
      "ux_input": "radioUx",
      "validation":["Masculino", "Feminino", "Binarie", "Otro"],
  },
  {
      "_id":  "6187df233b2a467cc61dfa27",
      "var": "edad",
      "description": "Monto de dinero generado mensualmente",
      "value_type": "number",
      "ux_input": "numberUx"
  },
    {
    "_id":"61c2afe5bdedfb648b771bcd",
    "var":"preferencias_financieras",
    "description":"xxx",
    "type":"cat_open",
    "ux_input":"worder",
    "validation": false,
    "timestamp":"2021-12-01T03:00:00.000Z"
    },
    {
        "processed": true,
        "_id": "61ca34a835742bfab4e0c050",
        "value": "60000",
        "user": "Pepe",
        "type": "int",
        "validation": "",
        "ux_input": "numberUx",
        "var": "ingresos",
        "description": "xxx",
        "measurement": "currency"
    },
    {
        "_id": "61c2af95bdedfb648b771bc3",
        "timestamp": "2021-12-01T03:00:00.000Z",
        "type": "int",
        "ux_input": "numberUx",
        "validation": "",
        "var": "gastos",
        "description": "xxx"
    }
];


export const superData = [
    {
    "_id":"61c2afe5bdedfb648b771bcd",
    "var":"preferencias_financieras",
    "description":"xxx",
    "type":"cat_open",
    "ux_input":"Worder",
    "validation": false,
    "timestamp":"2021-12-01T03:00:00.000Z"
    },
    {
    "_id":"61c2afc2bdedfb648b771bc8",
    "var":"max_nivel_estudio",
    "type":"cat_closed",
    "description":"xxx",
    "ux_input":"RadioUx",
    "validation":["Primario", "Secundario", "Universitario", "Posgrado"],
    "timestamp":"2021-12-01T03:00:00.000Z",
    },
    {
    "_id":"61c2af95bdedfb648b771bc3",
    "var":"gastos",
    "type":"int",
    "ux_input":"Range",
    "validation":false,
    "description":"xxx",
    "timestamp":"2021-12-01T03:00:00.000Z",
    },
    {
    "_id":"61c2af6dbdedfb648b771bbe",
    "var":"ingresos",
    "type":"int",
    "ux_input":"SliderUx",
    "validation":false,
    "description":"xxx",
    "timestamp":"2021-12-01T03:00:00.000Z",
    },
    {
    "_id":"61c2a647bdedfb648b771ba9",
    "var":"ahorro",
    "type":"int",
    "ux_input":"SliderUx",
    "validation":"",
    "description":"xxx",
    "timestamp":"2021-12-01T03:00:00.000Z"
    }
]