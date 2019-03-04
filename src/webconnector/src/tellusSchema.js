export const telRichtingTable = {
  id: 'telrichting',
  alias: 'Tel richtingen',
  columns: [
    {
      id: 'id',
      dataType: tableau.dataTypeEnum.int,
      description: 'Tel richting id',
    },
    {
      id: 'tellus_id',
      alias: 'Tellus id',
      dataType: tableau.dataTypeEnum.int,
      description: 'Tellus id',
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
  alias: 'Meetraai mapping',
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

export const tellingTable = {
  id: 'telling',
  alias: 'Telling per uur',
  columns: [{
    id: 'tel_richting_id',
    alias: 'Tel richting id',
    dataType: tableau.dataTypeEnum.int
  },{
    id: 'tijd_van',
    alias: 'Tijd van',
    dataType: tableau.dataTypeEnum.string
  },{
    id: 'tijd_tot',
    alias: 'Tijd tot',
    dataType: tableau.dataTypeEnum.string
  },{
    id: 'aantal',
    alias: 'Aantal',
    dataType: tableau.dataTypeEnum.int
  },{
    id: 'lengte_interval_id',
    alias: 'Lengte interval id',
    dataType: tableau.dataTypeEnum.int
  },{
    id: 'snelheids_interval_id',
    alias: 'Snelheids interval id',
    dataType: tableau.dataTypeEnum.int
  },{
    id: 'meetraai_categorie_id',
    alias: 'Meetraai categorie id',
    dataType: tableau.dataTypeEnum.int
  },{
    id: 'representatief_categorie_id',
    alias: 'Representatief categorie id',
    dataType: tableau.dataTypeEnum.int
  },{
    id: 'validatie_categorie_id',
    alias: 'Validatie categorie id',
    dataType: tableau.dataTypeEnum.int
  }
  ],
};


export default [
  telRichtingTable,
  lengteIntervalTable,
  snelheidsIntervalTable,
  meetraaiCategorieTable,
  validatieCategorieTable,
  representatiefCategorieTable,
  tellingTable,
];
