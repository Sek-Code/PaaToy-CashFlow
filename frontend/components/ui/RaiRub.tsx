import { Wallet, BookOpen, Palette } from "lucide-react";

export function RaiRab() {
  const items = [
    { icon: <Wallet size={24} color="white" />, amount: "฿ 35,000.00" },
    { icon: <BookOpen size={24} color="white" />, amount: "฿ 800.00" },
    { icon: <Palette size={24} color="white" />, amount: "฿ 2,200.00" },
  ];

  return (
    <div>
      <h2>รายรับ</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              style={{
                background: "#3D3566",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
            <span>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
