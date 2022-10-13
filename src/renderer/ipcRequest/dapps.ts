import { randString } from "isomorphic/string";

export async function getAllDapps() {
  const reqid = randString();

  // TODO: use timeout mechanism
  return new Promise<IDapp[]>((resolve, reject) => {
    const dispose = window.rabbyDesktop.ipcRenderer.on(
      'dapps-fetch',
      (event) => {
        if (event.reqid === reqid) {
          resolve(event.dapps);
          dispose?.();
        }
      }
    );
    window.rabbyDesktop.ipcRenderer.sendMessage('dapps-fetch', reqid);
  });
}

export async function detectDapps(dappUrl: string) {
  const reqid = randString();

  // TODO: use timeout mechanism
  return new Promise<IDappsDetectResult>((resolve, reject) => {
    const dispose = window.rabbyDesktop.ipcRenderer.on(
      'detect-dapp',
      (event) => {
        if (event.reqid === reqid) {
          resolve(event.result);
          dispose?.();
        }
      }
    );
    window.rabbyDesktop.ipcRenderer.sendMessage('detect-dapp', reqid, dappUrl);
  });
}

export async function putDapp(dapp: IDapp) {
  const reqid = randString();

  // TODO: use timeout mechanism
  return new Promise<IDapp[]>((resolve, reject) => {
    const dispose = window.rabbyDesktop.ipcRenderer.on('dapps-put', (event) => {
      if (event.reqid === reqid) {
        resolve(event.dapps);
        dispose?.();
      }
    });
    window.rabbyDesktop.ipcRenderer.sendMessage('dapps-put', reqid, dapp);
  });
}

export async function deleteDapp(dapp: IDapp) {
  const reqid = randString();

  return new Promise<IDapp[]>((resolve, reject) => {
    const dispose = window.rabbyDesktop.ipcRenderer.on(
      'dapps-delete',
      (event) => {
        if (event.reqid === reqid) {
          event.error ? reject(new Error(event.error)) : resolve(event.dapps);
          dispose?.();
        }
      }
    );
    window.rabbyDesktop.ipcRenderer.sendMessage('dapps-delete', reqid, dapp);
  });
}