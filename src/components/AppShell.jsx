import SideRail from "./SideRail";

export default function AppShell({ children }) {
  return (
    <div className="app-layout">
      <SideRail />
      <div className="content-column">
        <header className="mobile-header">
          <div className="rail-mark">EU</div>
          <strong>EU AI Act Chat</strong>
        </header>
        {children}
      </div>
    </div>
  );
}
