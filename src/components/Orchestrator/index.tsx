import {ReactElement, useState, useEffect} from 'react';

import {
  IAction,
  ActionTypes,
} from '../../reducers/console';

import {ConsoleEntryTypes} from '../../types';

class OrchestratorController {

  private page: any[] = [];
  private pages: any[] = [];
  private dispatch: any;

  constructor(dispatch: (action: IAction) => void) {
    this.dispatch = dispatch;
  }

  private nextPage() {
    this.page = this.pages.shift();

    if (!this.page) {
      // exit
      return;
    }

    this.next();
  }

  appendPage(page: any) {
    if (this.pages.length === 0) {
      this.page = page;
    }
    this.pages.push(page);
  }

  next() {
    if(!this.page) {
      // exit
      return;
    }

    const pageItem = this.page.shift();

    if (!pageItem) {
      this.nextPage();
    }
    else if (this.dispatch) {
      const payload = pageItem.content;
      const type = pageItem.type === ConsoleEntryTypes.Command ?
        ActionTypes.AppendCommandToEntries :
        ActionTypes.AppendOutputToEntries;

      this.dispatch({payload, type});
    }
  }
};

interface Props {
  initialPage: any[];
  dispatch: (action: IAction) => void;
  children(next: () => void): ReactElement;
}

function OrchestratorComponent({children, dispatch, initialPage}: Props) {
  const [controller, setController] = useState();
  const next = controller ?
    controller.next.bind(controller) :
    () => null;

  useEffect(() => {
    const controller = new OrchestratorController(dispatch);

    setController(controller);

    controller.appendPage(initialPage);
    controller.next();
  }, [initialPage, dispatch]);

  return children(next);
}

export default OrchestratorComponent;
