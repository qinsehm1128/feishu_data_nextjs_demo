// Table metadata schema definitions
export interface TableField {
  fieldId: string;
  fieldName: string;
  fieldType: number;
  isPrimary?: boolean;
  description?: string;
  property?: {
    formatter?: string;
    currencyCode?: string;
    color?: number;
    symbol?: string;
    max?: number;
  };
}

export interface TableMeta {
  tableName: string;
  fields: TableField[];
}

export const tableMeta: TableMeta = {
  tableName: "测试连接器插件",
  fields: [
    {
      fieldId: "fid_1",
      fieldName: "id1",
      fieldType: 1, // Text
      isPrimary: true,
      description: "",
      property: {},
    },
    {
      fieldId: "fid_2",
      fieldName: "number2",
      fieldType: 2, // Number
      description: "",
      property: {
        formatter: "#,##0.00",
      },
    },
    {
      fieldId: "fid_3",
      fieldName: "single3",
      fieldType: 3, // SingleSelect
      description: "",
      property: {},
    },
    {
      fieldId: "fid_4",
      fieldName: "multi4",
      fieldType: 4, // MultiSelect
      description: "",
      property: {},
    },
    {
      fieldId: "fid_5",
      fieldName: "date5",
      fieldType: 5, // Date
      description: "",
      property: {
        formatter: "yyyy-MM-dd",
      },
    },
    {
      fieldId: "fid_6",
      fieldName: "barcode6",
      fieldType: 6, // Barcode
      description: "",
      property: {},
    },
    {
      fieldId: "fid_7",
      fieldName: "checkbox7",
      fieldType: 7, // Checkbox
      description: "",
      property: {},
    },
    {
      fieldId: "fid_8",
      fieldName: "currency8",
      fieldType: 8, // Currency
      description: "",
      property: {
        formatter: "#,##0.00",
        currencyCode: "USD",
      },
    },
    {
      fieldId: "fid_9",
      fieldName: "progress9",
      fieldType: 11, // Progress
      description: "",
      property: {
        color: 4,
      },
    },
    {
      fieldId: "fid_10",
      fieldName: "rating10",
      fieldType: 12, // Rating
      description: "",
      property: {
        max: 5,
        symbol: "smile",
      },
    },
    {
      fieldId: "fid_12",
      fieldName: "url12",
      fieldType: 10, // URL
      description: "",
      property: {},
    },
    {
      fieldId: "fid_13",
      fieldName: "phone13",
      fieldType: 9, // Phone
      description: "",
      property: {},
    },
  ],
};
