export function UserBubble({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-xl max-w-xl shadow">
                {children}
            </div>
        </div>
    )
}