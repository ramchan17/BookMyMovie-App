import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import UpcomingMovies from "./UpcomingMovies";
import ReleasedMovies from "./ReleasedMovies";
import allConstants from "../../constants";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesHeading: {
    textAlign: "center",
    background: "#ff9999",
    padding: "8px",
    fontSize: "1rem",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

function Home(props) {
  const [movieName, setMovieName] = useState("");
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [releaseDateStart, setReleaseDateStart] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const { baseUrl, getData } = allConstants;
  const { classes } = props;

  const fetchData = async () => {
    const moviesData = await getData(baseUrl + "movies?status=RELEASED");
    setMoviesData(moviesData.movies);
    const genreData = await getData(baseUrl + "genres");
    setGenresList(genreData.genres);
    const artistsData = await getData(baseUrl + "artists");
    setArtistsList(artistsData.artists);
  };

  const movieNameChangeHandler = (event) => {
    setMovieName(event.target.value);
  };

  const genreSelectHandler = (event) => {
    setGenres(event.target.value);
  };

  const artistSelectHandler = (event) => {
    setArtists(event.target.value);
  };

  const releaseDateStartHandler = (event) => {
    setReleaseDateStart(event.target.value);
  };

  const releaseDateEndHandler = (event) => {
    setReleaseDateEnd(event.target.value);
  };
  const filterApplyHandler = () => {
    let queryString = "?status=RELEASED";
    if (movieName !== "") {
      queryString += "&title=" + movieName;
    }
    if (genres.length > 0) {
      queryString += "&genre=" + genres.toString();
    }
    if (artists.length > 0) {
      queryString += "&artists=" + artists.toString();
    }
    if (releaseDateStart !== "") {
      queryString += "&start_date=" + releaseDateStart;
    }
    if (releaseDateEnd !== "") {
      queryString += "&end_date=" + releaseDateEnd;
    }

    const url = baseUrl + "movies" + encodeURI(queryString);
    getData(url).then((data) => {
      setMoviesData(data.movies);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterMovies = () => {
    return (
      <div className="right">
        {/** Apply Filters card on the right */}
        <Card>
          <CardContent>
            <FormControl className={classes.formControl}>
              <Typography className={classes.title} color="textSecondary">
                FIND MOVIES BY:
              </Typography>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="movieName">Movie Name</InputLabel>
              <Input id="movieName" onChange={movieNameChangeHandler} />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
              <Select
                multiple
                input={<Input id="select-multiple-checkbox-genre" />}
                renderValue={(selected) => selected.join(",")}
                value={genres}
                onChange={genreSelectHandler}
              >
                {genresList.map((genre) => (
                  <MenuItem key={genre.id} value={genre.genre}>
                    <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                    <ListItemText primary={genre.genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">
                Artists
              </InputLabel>
              <Select
                multiple
                input={<Input id="select-multiple-checkbox" />}
                renderValue={(selected) => selected.join(",")}
                value={artists}
                onChange={artistSelectHandler}
              >
                {artistsList.map((artist) => (
                  <MenuItem
                    key={artist.id}
                    value={artist.first_name + " " + artist.last_name}
                  >
                    <Checkbox
                      checked={
                        artists.indexOf(
                          artist.first_name + " " + artist.last_name
                        ) > -1
                      }
                    />
                    <ListItemText
                      primary={artist.first_name + " " + artist.last_name}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="releaseDateStart"
                label="Release Date Start"
                type="date"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
                onChange={releaseDateStartHandler}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="releaseDateEnd"
                label="Release Date End"
                type="date"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
                onChange={releaseDateEndHandler}
              />
            </FormControl>
            <br />
            <br />
            <FormControl className={classes.formControl}>
              <Button
                onClick={() => filterApplyHandler()}
                variant="contained"
                color="primary"
              >
                APPLY
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <UpcomingMovies />
      <div className="flex-container">
        <div className="left">
          <ReleasedMovies releasedMovies={moviesData} history={props.history} />
        </div>
        {filterMovies()}
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
