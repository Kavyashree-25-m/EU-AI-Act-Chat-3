import { NavLink } from "react-router-dom";
import {
  BookOpen,
  MessageSquareText,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

export default function SideRail() {
  return (
    <aside className="side-rail">
      <div className="rail-brand">
        <div className="rail-mark">EU</div>
        <div>
          <strong>AI Act Chat</strong>
          <span>Compliance workspace</span>
        </div>
      </div>

      <nav className="rail-nav">
        <NavLink to="/" end className={({isActive}) => `rail-link ${isActive ? "active" : ""}`}>
          <MessageSquareText size={18} />
          <span>Ask</span>
        </NavLink>

        <NavLink to="/classify" className={({isActive}) => `rail-link ${isActive ? "active" : ""}`}>
          <ScanSearch size={18} />
          <span>Classify</span>
        </NavLink>
      </nav>

      <div className="rail-meta">
        <div><ShieldCheck size={15} /><span>Knowledge base ready</span></div>
        <div><BookOpen size={15} /><span>254 atomic rules</span></div>
      </div>

      <div className="rail-footer">
        <span>Design-time reference</span>
        <small>Not legal advice</small>
      </div>
    </aside>
  );
}
