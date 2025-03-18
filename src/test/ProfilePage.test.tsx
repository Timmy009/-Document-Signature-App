
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { MemoryRouter } from "react-router-dom";
// import ProfilePage from "../pages/profile";
// // ✅ Mock current date
// beforeAll(() => {
//   jest.useFakeTimers();
//   jest.setSystemTime(new Date("2024-03-10T12:00:00Z"));
// });
// afterAll(() => {
//   jest.useRealTimers();
// });

// // ✅ Mock localStorage for isolation
// beforeEach(() => {
//   jest.clearAllMocks();
//   localStorage.getItem = jest.fn((key) => {
//     if (key === "userSignatures") return JSON.stringify([]);
//     if (key === "signedDocuments") return JSON.stringify([]);
//     return null;
//   });
//   localStorage.setItem = jest.fn();
// });

// describe("🔹 Profile Page - Signature and Document Signing Tests", () => {
//   test("✅ Renders Profile Page Correctly", () => {
//     render(
//       <MemoryRouter>
//         <ProfilePage />
//       </MemoryRouter>
//     );

//     expect(screen.getByText("John Doe")).toBeInTheDocument();
//     expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
//   });

//   test("✅ Saves a Drawn Signature to LocalStorage", async () => {
//     render(
//       <MemoryRouter>
//         <ProfilePage />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByText("Save Signature"));

//     await waitFor(() => {
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         "userSignatures",
//         expect.stringContaining("[")
//       );
//     });
//   });

//   test("✅ Adds Signed Document with Date", async () => {
//     render(
//       <MemoryRouter>
//         <ProfilePage />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByText("Save Signature"));

//     await waitFor(() => {
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         "signedDocuments",
//         expect.stringContaining(`"signedAt":"2024-03-10"`) // ✅ Match correct date format
//       );
//     });

//     expect(screen.getByText("Signed on: 2024-03-10")).toBeInTheDocument();
//   });

//   test("✅ Deletes a Signed Document", async () => {
//     render(
//       <MemoryRouter>
//         <ProfilePage />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByText("Save Signature"));

//     await waitFor(() => {
//       expect(screen.getByText(/Signed on:/)).toBeInTheDocument();
//     });

//     const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
//     fireEvent.click(deleteButton);

//     await waitFor(() => {
//       expect(localStorage.setItem).toHaveBeenCalledWith("signedDocuments", "[]");
//     });

//     expect(screen.queryByText(/Signed on:/)).not.toBeInTheDocument();
//   });

//   test("✅ Handles Edge Case - No Signatures", async () => {
//     render(
//       <MemoryRouter>
//         <ProfilePage />
//       </MemoryRouter>
//     );

//     expect(screen.getByText("No signature uploaded yet.")).toBeInTheDocument();
//   });

//   test("✅ Handles Edge Case - No Signed Documents", async () => {
//     render(
//       <MemoryRouter>
//         <ProfilePage />
//       </MemoryRouter>
//     );

//     expect(screen.getByText("No signed documents.")).toBeInTheDocument();
//   });
// });
