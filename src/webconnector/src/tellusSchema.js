export const tellusTable = {
  id: 'tellus',
  alias: 'Tellussen',
  columns: [
    {
      id: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'objnr_vor',
      alias: 'Objectnummer V&OR',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'objnr_leverancier',
      alias: 'Objectnummer leverancier',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'meetlocatie_id',
      alias: 'Meetlocatie id',
      dataType: tableau.dataTypeEnum.int
    }, {
      id: 'meetlocatie_naam',
      alias: 'Meetlocatie naam',
      dataType: tableau.dataTypeEnum.string
    }, {
      id: 'latitude',
      alias: 'Latitude',
      dataType: tableau.dataTypeEnum.float
    }, {
      id: 'longitude',
      alias: 'Longitude',
      dataType: tableau.dataTypeEnum.float
    }, {
      id: 'snelheids_categorie',
      alias: 'Snelheids categorie',
      dataType: tableau.dataTypeEnum.int
    }
  ]
};

export const telRichtingTable = {
  id: 'telrichting',
  alias: 'Tel richtingen',
  columns: [
    {
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'richting',
      alias: 'Richting id',
      dataType: tableau.dataTypeEnum.int
    }, {
      id: 'naam',
      alias: 'Naam',
      dataType: tableau.dataTypeEnum.string
    }, {
      id: 'zijstraat',
      alias: 'Zijstraat',
      dataType: tableau.dataTypeEnum.string
    }
  ]
};

export const tellingTotaalUurdagTable = {
  id: 'telling_totaal_uur_dag',
  alias: 'Telling samengevoegd per uur',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'richting_id',
      alias: 'Richting id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'dag_uur',
      alias: 'Dag uur gemeten',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'dag_type',
      alias: 'Dag type',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal',
      alias: 'Aantal',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export const tellingTotaalUurdagLengteTable = {
  id: 'telling_totaal_uur_dag_lengte',
  alias: 'Telling samengevoegd per uur per lengte',
  columns: [
    // ...tellingTotaalUurdagTable.columns,
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'richting_id',
      alias: 'Richting id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'dag_uur',
      alias: 'Dag uur gemeten',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'dag_type',
      alias: 'Dag type',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal',
      alias: 'Aantal',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'lengte_interval_id',
      alias: 'Lengte interval id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'lengte_label',
      alias: 'Lengte label',
      dataType: tableau.dataTypeEnum.string
    }
  ],
};

export const tellingTotaalUurdagSnelheidTable = {
  id: 'telling_totaal_uur_dag_snelheid',
  alias: 'Telling samengevoegd per uur per snelheid',
  columns: [
    // ...tellingTotaalUurdagTable.columns,
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'richting_id',
      alias: 'Richting id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'dag_uur',
      alias: 'Dag uur gemeten',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'dag_type',
      alias: 'Dag type',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal',
      alias: 'Aantal',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'snelheids_interval_id',
      alias: 'Snelheids interval id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'snelheids_label',
      alias: 'Snelheids label',
      dataType: tableau.dataTypeEnum.string
    }
  ],
};




export const tellingYMHTable = {
  id: 'telling_ymh',
  alias: 'Telling jaar maand uur dag_type',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'richting',
      alias: 'Richting (niet richting table row id, maar \'direction\')',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'jaar',
      alias: 'Jaar',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'maand',
      alias: 'Maand',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'uur',
      alias: 'Uur',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'dag_type',
      alias: 'Dag type',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal',
      alias: 'Aantal',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export const tellingYMHLengthTable = {
  id: 'telling_ymh_lengte',
  alias: 'Telling jaar maand uur dag_type lengte',
  columns: [
    // ...tellingTotaalUurdagTable.columns,
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'richting',
      alias: 'Richting (niet richting table row id, maar \'direction\')',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'jaar',
      alias: 'Jaar',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'maand',
      alias: 'Maand',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'uur',
      alias: 'Uur',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'dag_type',
      alias: 'Dag type',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal',
      alias: 'Aantal',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'lengte_interval_id',
      alias: 'Lengte interval id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'lengte_label',
      alias: 'Lengte label',
      dataType: tableau.dataTypeEnum.string
    }
  ],
};

export const tellingYMHSpeedTable = {
  id: 'telling_ymh_snelheid',
  alias: 'Telling jaar maand uur dag_type snelheid',
  columns: [
    // ...tellingTotaalUurdagTable.columns,
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'richting',
      alias: 'Richting (niet richting table row id, maar \'direction\')',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'jaar',
      alias: 'Jaar',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'maand',
      alias: 'Maand',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'uur',
      alias: 'Uur',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'dag_type',
      alias: 'Dag type',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal',
      alias: 'Aantal',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'snelheids_interval_id',
      alias: 'Snelheids interval id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'snelheids_label',
      alias: 'Snelheids label',
      dataType: tableau.dataTypeEnum.string
    }
  ],
};

export default [
  tellusTable,
  telRichtingTable,
  tellingTotaalUurdagTable,
  tellingTotaalUurdagLengteTable,
  tellingTotaalUurdagSnelheidTable,
  tellingYMHTable,
  tellingYMHLengthTable,
  tellingYMHSpeedTable,
];
