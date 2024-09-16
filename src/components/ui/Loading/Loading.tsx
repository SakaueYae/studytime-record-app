export const Loading = () => {
  const radius = 74;

  return (
    <div className="w-36 h-36 rounded-full  animate-spin flex justify-center items-center relative duration-500">
      {[...Array(8)].map((_, i) => (
        <p
          key={i}
          className="w-8 h-8 rounded-full absolute bg-blue-500"
          style={{
            top: Math.sin((Math.PI * i) / 4) * radius + radius - 16,
            left: Math.cos((Math.PI * i) / 4) * radius + radius - 16,
          }}
        ></p>
      ))}
      <p className="animate-none">Loading...</p>
    </div>
  );
};
