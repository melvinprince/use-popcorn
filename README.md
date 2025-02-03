```markdown
# use-popcorn

## Overview

**use-popcorn** is a simple web application that allows users to search for movies, rate them, and save their watched movies locally. This project utilizes the [OMDb API](https://www.omdbapi.com/) to fetch movie data.

## Features

- **Movie Search**: Search for movies by title.
- **Movie Rating**: Rate movies based on personal preference.
- **Watched List**: Save and manage a list of watched movies locally.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: Vite

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/melvinprince/use-popcorn.git
   cd use-popcorn
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up API Key**:

   - Obtain a free API key from the [OMDb API](https://www.omdbapi.com/apikey.aspx).
   - Create a `KEY.js` file in the project root directory and add the following content:

     ```javascript
     const KEY = "your_api_key";
     export default KEY;
     ```

     Replace `"your_api_key"` with the API key you obtained.

4. **Start the Application**:

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`.

## Usage

1. **Search for Movies**: Use the search bar to find movies by title.
2. **Rate Movies**: Click on a movie to view details and provide a rating.
3. **Manage Watched List**: Add movies to your watched list and manage them as needed.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact:

- **GitHub**: [melvinprince](https://github.com/melvinprince)
```
