import React from 'react';

const evaluateBackgroundSync = async () => {

  try {

    const sw = await navigator.serviceWorker.ready;

    await sw.sync.register('sync-test');

    return true;

  } catch {

    return false;

  }

};


const evaluatePermissions = async () => {

  const permissions = {};

  permissions.backgroundSync = await evaluateBackgroundSync();

  return permissions;

};

const PermissionContext = React.createContext(evaluatePermissions());

export { PermissionContext as default };
