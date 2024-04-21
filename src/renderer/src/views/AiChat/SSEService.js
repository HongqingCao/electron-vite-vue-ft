/*
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-04-20 23:20:01
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-21 20:43:01
 */
export default class SSEService {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.eventSource = null;
    this.messageListeners = [];
    this.errorListeners = [];
  }

  connect() {
    this.eventSource = new EventSource(this.endpoint);
    this.eventSource.addEventListener("message", this.handleSSEMessage);
    this.eventSource.addEventListener("error", this.handleSSEError);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  handleSSEMessage = (event) => {
    this.messageListeners.forEach((listener) => listener(event.data));
  };

  handleSSEError = (event) => {
    this.errorListeners.forEach((listener) => listener(event));
  };

  addMessageListener(listener) {
    this.messageListeners.push(listener);
  }

  removeMessageListener(listener) {
    this.messageListeners = this.messageListeners.filter(
      (l) => l !== listener
    );
  }

  addErrorListener(listener) {
    this.errorListeners.push(listener);
  }

  removeErrorListener(listener) {
    this.errorListeners = this.errorListeners.filter((l) => l !== listener);
  }
}