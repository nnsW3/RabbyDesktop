import '@/renderer/css/theme/index.css';

import { createRoot } from 'react-dom/client';

import './webui.less';
import '@/renderer/css/windicss';
import '@/renderer/utils/rendererReport';
import '@/renderer/ipcRequest/zPopupMessage';

import { MainWindow } from '@/renderer/components/MainWindow';
import Topbar from '@/renderer/components/Topbar';

import {
  isForTrezorLikeWebUI,
  isMainWinShellWebUI,
  isRabbyXNotificationWinShellWebUI,
} from '@/isomorphic/url';
import { HardwareConnectTopbar } from '@/renderer/components/HardwareConnectTopbar/HardwareConnectTopbar';

if (isMainWinShellWebUI(window.location.href)) {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<MainWindow />);
} else if (isForTrezorLikeWebUI(window.location.href)) {
  document.documentElement.classList.add('__rabbyx-trezor-like', 'popup-win');

  const container = document.getElementById('topbar')!;
  const root = createRoot(container);
  root.render(<HardwareConnectTopbar />);
} else if (!isRabbyXNotificationWinShellWebUI(window.location.href)) {
  document.documentElement.classList.add('__rabbyx-browser-like', 'popup-win');

  const container = document.getElementById('topbar')!;
  const root = createRoot(container);
  root.render(<Topbar />);
}
