import { useEffect, useState } from 'react'
import './home.css'

function Home() {
    const [internships, setInternships] = useState([])
    const [showFavorites, setShowFavorites] = useState(false)


    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await fetch('http://localhost:5000/api') // Replace with your backend URL
                const data = await response.json()
                setInternships(data)
            } catch (error) {
                console.error('Error fetching internships:', error)
            }
        }

        fetchInternships()
    }, [])

    const handleAddToFavorites = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${id}/favorite`, {
                method: 'PUT',
            })
            if (response.ok) {
                const updatedInternship = await response.json()
                setInternships((prev) =>
                    prev.map((internship) =>
                        internship._id === id ? updatedInternship : internship
                    )
                )
            } else {
                console.error('Failed to update favorite status')
            }
        } catch (error) {
            console.error('Error updating favorite status:', error)
        }
    }

    const filteredInternships = showFavorites
        ? internships.filter((internship) => internship.isFavorite === "true")
        : internships

    return (
        <div className="home-container">
            <h1>Internships</h1>
            <div className="filter-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={showFavorites}
                        onChange={() => setShowFavorites((prev) => !prev)}
                        style={{ "marginBottom": "20px" }}
                    />
                    Show Favorites Only
                </label>
            </div>
            <div className="internship-list">
                {filteredInternships.map((internship) => (
                    <div key={internship._id} className="internship-card">
                        <h2>{internship.company}</h2>
                        <p><strong>Role:</strong> {internship.role}</p>
                        <p><strong>Duration:</strong> {internship.duration}</p>
                        <p><strong>Favorite:</strong> {internship.isFavorite === "true" ? "Yes" : "No"}</p>
                        {internship.isFavorite !== "true" && (
                            <button
                                className="favorite-button"
                                onClick={() => handleAddToFavorites(internship._id)}
                            >
                                ❤️ Add to Favorites
                            </button>
                        )}
                        {internship.isFavorite === "true" && (
                            <button
                                className="favorite-button"
                                onClick={() => handleAddToFavorites(internship._id)}
                            >
                                Remove from Favorites
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home