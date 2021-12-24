export const SliderData =   [
  {
      "_id":  "6187df233b2a467cc61dfa26",
      "name": "gender",
      "description": "Monto de dinero generado mensualmente",
      "value_type": "cat_closed",
      "ux_type": "radioUx",
      "validation":["Masculino", "Feminino", "Binarie", "Otro"],
  },
  {
      "_id":  "6187df233b2a467cc61dfa27",
      "name": "edad",
      "description": "Monto de dinero generado mensualmente",
      "value_type": "number",
      "ux_type": "sliderUx"
  },
  {
      "_id":  "6187df233b2a467cc61dfa28",
      "name": "studies",
      "description": "Monto de dinero generado mensualmente",
      "value_type": "cat_closed",
      "ux_type": "radioUx",
      "validation":["Primario", "Secundario", "Universitario", "Posgrado"],
  },
  {
    "_id":"61c2af6dbdedfb648b771bbe",
    "name":"ingresos",
    "type":"int",
    "ux_type":"sliderUx",
    "validation":false,
    "description":"xxx",
    "timestamp":"2021-12-01T03:00:00.000Z",
    },
    {
    "_id":"61c2afe5bdedfb648b771bcd",
    "name":"preferencias_financieras",
    "description":"xxx",
    "type":"cat_open",
    "ux_type":"worder",
    "validation": false,
    "timestamp":"2021-12-01T03:00:00.000Z"
    },
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