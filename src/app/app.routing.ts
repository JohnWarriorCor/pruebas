import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";

const routes: Routes = [
  // INICIO
  { path: "inicio", component: InicioComponent },
  // ROOT
  { path: "**", pathMatch: "full", redirectTo: "inicio" },
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: true,
  onSameUrlNavigation: "reload",
});
