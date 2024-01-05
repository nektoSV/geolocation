export default class Geo {
  constructor() {
    this.options = {
      enableAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
  }

  getPosition() {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(this.successHandler(position)),
          (error) => resolve(this.errorHandler(error))
        );
      } else {
        this.errorDescription = {
          success: true,
          title: "Выбранный браузер не поддерживает геолоакацию",
          message: "Выберите другой браузер или введите данные вручную",
        };
        resolve(this.errorDescription);
      }
    });
  }

  successHandler(position) {
    this.errorDescription = null;
    const { latitude, longitude } = position.coords;
    this.coords = {
      success: true,
      latitude: +latitude.toFixed(5),
      longitude: +longitude.toFixed(5),
      date: new Date(position.timestamp).toLocaleString(),
    };

    return this.coords;
  }

  errorHandler(error) {
    this.coords = null;
    this.errorDescription = {};
    switch (error.code) {
      case 1:
        this.errorDescription = {
          success: false,
          title: "Нет разразрешения нa использование геолокации",
          message:
            "Измените настройки и обновите страницу или введите координаты вручную",
        };
        break;
      case 2:
        this.errorDescription = {
          success: false,
          title: "Техническая ошибка",
          message:
            "Измените настройки и обновите страницу или введите координаты вручную",
        };
        break;
      case 3:
        this.errorDescription = {
          success: false,
          title: "Превышено время ожидания",
          message:
            "Измените настройки и обновите страницу или введите координаты вручную",
        };
        break;
      default:
        this.errorDescription = {
          success: false,
          title: "Неизвестная ошибка",
          message:
            "Упс, что-то пошло не так...Повторите попытку или введите координаты вручную",
        };
    }

    return this.errorDescription;
  }
}
