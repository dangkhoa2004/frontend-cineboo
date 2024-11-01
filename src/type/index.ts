// index.ts
export interface Movie {
  id: string;
  maPhim: string;
  tenPhim: string;
  anhPhim: string;
  dienVien: string;
  danhSachTLPhims: {
    id: number;
    theLoaiPhim: {
      id: number;
      maTLPhim: string;
      tenTheLoai: string;
      trangThai: number;
    };
    trangThai: number;
  }[];
  nam: number;
  noiDungMoTa: string;
  trailer: string;
  ngayRaMat: number;
  thoiLuong: number;
  quocGia: string;
  noiDung: string;
  gioiHanDoTuoi: {
    id: number;
    maDoTuoi: string;
    tenDoTuoi: string;
  };
  trangThai: number;
  danhGia?: number;
  luotXem?: number;
}
