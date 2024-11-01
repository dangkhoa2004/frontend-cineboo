// index.ts
export interface Movie {
    id: string;
    tenPhim: string;
    anhPhim: string;
    dienVien: string;
    nam: number;
    noiDungMoTa: string;
    thoiLuong: number;
    quocGia: string;
    gioiHanDoTuoi: { tenDoTuoi: string };
    ngayRaMat: string;
    trailer: string;
    danhGia?: number;
    luotXem?: number;
  }
  