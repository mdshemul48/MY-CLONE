# Movie Publisher for CircleFTP

## setup for new pc
First run this command

`$ pip install requirments.txt
`

then edit `auth_info.py` and replace chrome profile folder path.
```
self.chrome_profile_one = r"past chrome path here"
self.chrome_profile_two = r"past chrome path here 2"
self.chrome_profile_three = r"past chrome path here 3"
self.chrome_profile_four = r"past chrome path here 4"
```

and enter your login info..

```
self.circle_user = 'demo'
self.circle_password = 'password'
```

## how to run the script
Follow those steps to publish movie or tv series.

### publish movie

Run this command to publish movies.

` 
$ python main.py -i "movie input folder" -c catagory_no -o "movie output folder" -l "movie publish link"
`

for example

`
$ py main.py -i "V:\Hindi Content\.temp\hin\hindi" -c 1 -o "V:\Hindi Content\Hindi Movies" -l "http://index.circleftp.net/FILE/Hindi%20Content/Hindi%20Movies"
`

### TV seires publish
and for tv series you have to add `-t` in last of the command.

`
$ py main.py -i "input folder" -c catagory_no -o "output folder" -l "tv series folder link" -t
`

for example 

`
$ py main.py -i "Q:\yoyo" -c 7 -o "Q:\English & Foreign TV Series" -l "http://ftp7.circleftp.net/FILE/English%20%26%20Foreign%20TV%20Series" -t -m
`

your option is:-

1. Hindi Movies 

2. English Movies 

3. Foreign Movies

4. Animation Movies

5. English & Foreign Dubbed Movies 

6. South Indian Movies

7. English and foreign Tv Series


