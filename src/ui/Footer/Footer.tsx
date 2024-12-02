import Image from "next/image"

const Footer = () => {
  return (
    <footer className="row-start-3 flex items-center justify-center bg-gray-800 py-4 text-center text-sm text-white sm:text-base">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://www.linkedin.com/in/sara-mesa-guerra/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made with ❤️ by{" "}
        <Image
          className="rounded-full"
          aria-hidden
          src="/sara.jpg"
          alt="Sara picture"
          width={16}
          height={16}
        />
      </a>
    </footer>
  )
}

export default Footer
