export function AIBubble({children}: {children: React.ReactNode}) {
    return (
    <div className="w-full">
      <div className="bg-white border p-4 rounded-xl shadow-sm">
        {children}
      </div>
    </div>
    )
}