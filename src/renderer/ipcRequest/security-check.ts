import { randString } from '../../isomorphic/string';

export async function securityCheckGetDappInfo(dappUrl: string) {
  const reqid = randString();

  return new Promise<IDapp | null>((resolve, reject) => {
    const dispose = window.rabbyDesktop.ipcRenderer.on(
      '__internal_rpc:security-check:get-dapp',
      (event) => {
        const { reqid: reqId, dappInfo } = event;
        if (reqId === reqid) {
          resolve(dappInfo);
          dispose?.();
        }
      }
    );
    window.rabbyDesktop.ipcRenderer.sendMessage(
      '__internal_rpc:security-check:get-dapp',
      reqid,
      dappUrl
    );
  });
}

export async function queryAndPutDappSecurityCheckResult(dappUrl: string) {
  const reqid = randString();

  return new Promise<ISecurityCheckResult>((resolve, reject) => {
    const dispose = window.rabbyDesktop.ipcRenderer.on(
      '__internal_rpc:security-check:check-dapp-and-put',
      (event) => {
        const { reqid: reqId, result, error } = event;
        if (reqId === reqid) {
          if (error) {
            reject(error);
            return;
          }

          resolve(result!);
          dispose?.();
        }
      }
    );
    window.rabbyDesktop.ipcRenderer.sendMessage(
      '__internal_rpc:security-check:check-dapp-and-put',
      reqid,
      dappUrl
    );
  });
}
