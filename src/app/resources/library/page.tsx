import Image from "next/image";

export default function Library() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-media w-full h-[70vh] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold">Library</h1>
          <p className="text-white text-lg md:text-2xl mt-4 max-w-3xl mx-auto">
            Our resources are here to help you grow in your faith and walk with God.
          </p>
        </div>
      </div>

      {/* Library Content */}
      <div className="bg-blue-100 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-l-4 border-blue-600 px-5 py-3 mb-[5rem]">
            <h1 className="text-5xl font-normal pb-5 text-blue-700">Library</h1>
            <p className="font-light text-2xl">
              Explore our collection of resources to deepen your faith and understanding.
            </p>
          </div>

          {/* Book List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 bg-opacity-70 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <Image
                  src="/bg/images/bg.jpg"
                  alt={`Book ${index + 1}`}
                  width={500}
                  height={300}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col space-y-3">
                  <h2 className="text-2xl font-bold text-[#393ee3]">
                    Book Title {index + 1}
                  </h2>
                  <p className="text-gray-700">
                    Discover insights and knowledge to help you grow spiritually
                    and intellectually.
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
