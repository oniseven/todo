const JoiMessage = {
  required: "{{#label}} dibutuhkan",
  empty: "{{#label}} tidak boleh kosong",
  min: "Panjang {{#label}} minimal harus {{#limit}} karakter",
  max: "Panjang {{#label}} maksimal harus {{#limit}} karakter",
  notValid: "{{#label}} tidak valid",
  length: "Panjang karakter {{#label}} harus {{#limit}} karakter",
  pattern: {
    base: "{{#label}} harus berisi\n1.Satu Huruf Besar,\n2.Satu Huruf Kecil,\n3. Satu Angka,\n4. Satu Spesial Karakter berikut @$!%*?_&\ncontoh: !123_HaloDunia",
    baseLogin: "{{#label}} harus berisi:\n\n1. Satu Huruf Besar,\n2. Satu Huruf Kecil,\n3. Satu Angka,\n4. Satu Spesial Karakter berikut @$!%*?_&\n\ncontoh: !123_HaloDunia",
  },
  string: {
    base: "{{#label}} harus berupa text!"
  },
  number: {
    base: "{{#label}} harus berupa angka!"
  },
  date: {
    base: "{{#label}} harus berupa tanggal. Contoh: 2001-01-01",
    format: "{{#label}} harus dalam format 'YYYY-MM-DD'. Contoh: 2001-01-01",
    milliseconds: "{{#label}} harus dalam milliseconds"
  }
}

export default JoiMessage;