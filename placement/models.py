from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    department = models.CharField(max_length=50)
    year = models.IntegerField()
    cgpa = models.FloatField()
    skills = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Company(models.Model):
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    job_role = models.CharField(max_length=100)
    package = models.FloatField()
    eligibility_cgpa = models.FloatField()

    def __str__(self):
        return self.company_name


class Placement(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    placement_date = models.DateField()
    status = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.student.name} - {self.company.company_name}"