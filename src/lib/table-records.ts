// Table records data
export interface RecordData {
  [fieldId: string]: any;
}

export interface TableRecord {
  primaryId: string;
  data: RecordData;
}

export interface RecordsResponse {
  nextPageToken: string;
  hasMore: boolean;
  records: TableRecord[];
}

export const tableRecords: RecordsResponse = {
  nextPageToken: "xxx",
  hasMore: false,
  records: [
    {
      primaryId: "record_1",
      data: {
        fid_1: "xxx",
        fid_2: 1343,
        fid_3: "a",
        fid_4: ["b", "c"],
        fid_5: 1697994894000,
        fid_6: "xxx",
        fid_7: true,
        fid_8: 1343.343443,
        fid_9: 40,
        fid_10: 3,
        fid_12: {
          name: "链接文字",
          url: "HTTPS://xxx",
        },
        fid_13: "13800000000",
      },
    },
    {
      primaryId: "record_2",
      data: {
        fid_1: "yyy",
        fid_2: 2000,
        fid_3: "b",
        fid_4: ["a", "c"],
        fid_5: 1697994894000,
        fid_6: "yyy",
        fid_7: false,
        fid_8: 2500.50,
        fid_9: 75,
        fid_10: 5,
        fid_12: {
          name: "示例链接",
          url: "HTTPS://example.com",
        },
        fid_13: "13900000000",
      },
    },
    {
      primaryId: "record_3",
      data: {
        fid_1: "zzz",
        fid_2: 3500,
        fid_3: "c",
        fid_4: ["a", "b"],
        fid_5: 1697994894000,
        fid_6: "zzz",
        fid_7: true,
        fid_8: 5000.75,
        fid_9: 90,
        fid_10: 4,
        fid_12: {
          name: "测试URL",
          url: "HTTPS://test.com",
        },
        fid_13: "13700000000",
      },
    },
  ],
};
