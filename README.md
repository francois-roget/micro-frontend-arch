# Dynamic Micro-frontend Architecture

This repository contains a demo of a dynamic Micro-frontend architecture to illustrate an article about the topic.

This project is built using a monorepo. This is by no mean a necessity for building such architecture but it was easier 
during the conception phase to be able to work on different pieces that needs to fit together at the same time. 
Once you've put such architecture in place, you are free to  work on completely separated repositories for each piece 
of this giant puzzle.

Also note that, while the micro-frontend approach is supposed to be technology agnostic; i.e. each micro-frontend can 
use a different web technology or framework, this POC uses React for all parts of the application. 
You can reuse this way of working to integrate other tehcnologies or frameworks if you need to.

The project has different parts:

- **The Portal** (`/apps/portal`) : This is the keystone of this architecture, the central hub as we explained it earlier. In this project you can find that
  - If the user is not yet logged in, the login page is displayed,
  - Once logged in, the api is called from the `Portal.tsx` component to get the list of Micro-frontends the logged in user has access to. This is where the dynamic specificity of this architecture is put into motion.
  - For each micro-frontend recieved from the api, the portal will create a `MicroFrontend.tsx` component. This component is responsible to get the `manifest.json` file from the url of the micro-frontend (cache it to increase future performance). With the content of the manifest file, it can render an `AsyncComponent`.
  - The `AsyncComponent.tsx` is responsible to load the corresponding js (and possibly css) files that are defined in the `manifest.json` file. As a convention, the micro-frontends will "register" themselves on the custom`window.microFrontends` object. This loading logic is externalised in the `ModuleService.ts` file.


- **The Server** (`/apps/server`): This naive implementation of a server is done using express. It is only for demonstrating purpose. It assumes that the logged in user is passed in the `Authorization` header and trust it. This is by no mean how it should be implemented in the real world but was an easy hack for this purpose.


- **The MFEs** (`/apps/mfe1` and `/apps/mfe2`): Those are 2 very simple React application that are bundled in a way to be loaded by the portal:
    - They register themselves in the custom`window.microFrontends` object in the `index.tsx` file. The actual entry point for those modules are their `Module.tsx` file.
    - They are built using a common webpack configuration that leverage the `assets-webpack-plugin` plugin, allowing the generation of the `manifest.json` file.


- **The common configuration** (`/packages/config`): This is where the micro-frontend specific configuration lives and can be shared amongst all micro-frontends to avoid copy-pasting it for each micro-frontend.

