export const translations = {
  app: {
    title: "Listele Mihaelei",
  },
  menu: {
    title: "Meniu",
    description: "Vezi listele salvate și istoricul produselor",
    lists: "Liste",
    products: "Produse",
    noLists: "Nu există liste salvate",
    noProducts: "Nu există produse în istoric",
  },
  dialog: {
    save: {
      title: "Salvează lista de cumpărături",
      description: "Introdu un nume pentru lista ta de cumpărături",
      nameLabel: "Numele listei",
      namePlaceholder: "Numele listei",
      confirm: "Salvează lista",
      cancel: "Anulează",
    },
    restore: {
      title: "Restaurare listă",
      description: "Ești sigur(ă) că vrei să restaurezi această listă?",
      confirm: "Restaurează",
      cancel: "Anulează",
    },
    delete: {
      title: "Ștergere listă",
      description: "Ești sigur(ă) că vrei să ștergi această listă? Această acțiune nu poate fi anulată.",
      confirm: "Șterge",
      cancel: "Anulează",
    },
  },
  products: {
    count: {
      one: "1 produs",
      other: "{{count}} produse",
    },
  },
  actions: {
    save: "Salvează",
    restore: "Restaurează",
    delete: "Șterge",
    cancel: "Anulează",
    clear: "Golește",
    add: "Adaugă",
  },
  button: {
    emptyList: "Golește Lista",
    saveList: "Salvează Lista",
    addItem: "Adaugă Produs",
    closeList: "Închide lista",
  },
  notifications: {
    enterName: "Introduceți un nume pentru listă",
    listDeleted: "Lista a fost ștearsă",
    listRestored: "Lista a fost restaurată",
    listCleared: "Lista a fost golită",
    listSaved: "Listă salvată cu succes",
    productDeleted: "Produsul a fost șters din toate listele",
  },
  errors: {
    generic: "Ceva nu a mers bine",
  },
  validation: {
    listName: {
      required: "Te rog introdu un nume pentru listă",
      minLength: "Numele listei trebuie să aibă cel puțin 3 caractere",
      maxLength: "Numele listei nu poate depăși 50 de caractere",
      noSpecialChars: "Numele listei poate conține doar litere, cifre, spații și cratime",
      duplicate: "O listă cu acest nume există deja",
      pattern: "Numele listei conține caractere invalide",
    },
    item: {
      required: "Numele articolului este obligatoriu",
      minLength: "Numele articolului trebuie să aibă cel puțin 2 caractere",
      maxLength: "Numele articolului trebuie să aibă mai puțin de 50 de caractere",
      noSpecialChars: "Numele articolului poate conține doar litere, cifre, spații și cratime",
      duplicate: "Acest articol există deja în listă",
      pattern: "Numele articolului conține caractere invalide",
    },
  },
  input: {
    addItem: "Adaugă un articol nou...",
  },
  empty: {
    title: "Începe cu Lista ta de Cumpărături",
    description: "Creează o listă nouă sau verifică listele anterioare din istoric",
    newList: "Creează Listă Nouă",
    showHistory: "Vezi Istoric",
  },
  list: {
    empty: "Lista este goală",
    new: "Listă nouă",
    current: "Lista curentă:",
    savedMessage: "Lista a fost salvată și poate fi accesată din istoric",
    closeList: "Închide lista",
    itemCount: {
      zero: "niciun produs",
      one: "1 produs",
      other: "{count} produse"
    },
    items: "produse",
    itemCount_zero: "articole",
    restore: "Restaurează lista",
    delete: "Șterge lista",
    currentList: "Lista curentă",
  },
  product: {
    usedCount: {
      one: "Folosit o dată",
      other: "Folosit de {{count}} ori"
    },
    use: "Folosește produsul",
    delete: "Șterge produsul",
  },
  common: {
    save: "Salvează",
    cancel: "Anulează"
  }
};
