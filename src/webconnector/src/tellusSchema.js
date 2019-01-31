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
      id: 'id',
      dataType: tableau.dataTypeEnum.int
    },
    {
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int
    },
    {
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
    },{
      id: 'objnr_vor',
      alias: 'Objectnummer V&OR',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'objnr_leverancier',
      alias: 'Objectnummer leverancier',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'weg_richting',
      alias: 'Weg richting',
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

export const lengteIntervalTable = {
  id: 'lengte_interval',
  alias: 'Lengte interval mapping',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'label',
      alias: 'Label',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'min_cm',
      alias: 'min_cm',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'max_cm',
      alias: 'max_cm',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export const snelheidsIntervalTable = {
  id: 'snelheids_interval',
  alias: 'Snelheids interval mapping',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'label',
      alias: 'Label',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'min_kmph',
      alias: 'Minimal kilometers/h speed',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'max_kmph',
      alias: 'Maximal kilometers/h speed',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export const meetraaiCategorieTable = {
  id: 'meetraai_categorie',
  alias: 'Meetrai mapping',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'label',
      alias: 'Label',
      dataType: tableau.dataTypeEnum.string
    }
  ],
};

export const validatieCategorieTable = {
  id: 'validatie_categorie',
  alias: 'Validatie mapping',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'label',
      alias: 'Label',
      dataType: tableau.dataTypeEnum.string
    }
  ],
};

export const representatiefCategorieTable = {
  id: 'representatief_categorie',
  alias: 'Representatief mapping',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'label',
      alias: 'Label',
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
      id: 'tel_richting_id',
      alias: 'Tel richting id',
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
    },{
      id: 'aantal_dagen',
      alias: 'Aantal dagen',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export const tellingYMHLengthTable = {
  id: 'telling_ymh_lengte',
  alias: 'Telling jaar maand uur dag_type lengte',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tel_richting_id',
      alias: 'Tel richting id',
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
    },{
      id: 'aantal_dagen',
      alias: 'Aantal dagen',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export const tellingYMHSpeedTable = {
  id: 'telling_ymh_snelheid',
  alias: 'Telling jaar maand uur dag_type snelheid',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'tel_richting_id',
      alias: 'Tel richting id',
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
    },{
      id: 'snelheids_interval_id',
      alias: 'Snelheids interval id',
      dataType: tableau.dataTypeEnum.int
    },{
      id: 'snelheids_label',
      alias: 'Snelheids label',
      dataType: tableau.dataTypeEnum.string
    },{
      id: 'aantal_dagen',
      alias: 'Aantal dagen',
      dataType: tableau.dataTypeEnum.int
    }
  ],
};

export default [
  // tellusTable,
  telRichtingTable,
  lengteIntervalTable,
  snelheidsIntervalTable,
  meetraaiCategorieTable,
  validatieCategorieTable,
  representatiefCategorieTable,
  tellingYMHTable,
  tellingYMHLengthTable,
  tellingYMHSpeedTable,
];
