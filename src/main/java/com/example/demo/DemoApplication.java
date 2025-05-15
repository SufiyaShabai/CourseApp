
package com.example.demo;

import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	@Autowired
	private CourseRepository courseRepo;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (courseRepo.count() == 0) {
			courseRepo.save(new Course(null, "AWS Certified Cloud Practitioner", "Beginner-level cloud course", "Cloud", null));
			courseRepo.save(new Course(null, "Azure Fundamentals", "Intro to Microsoft Azure services", "Cloud", null));
			courseRepo.save(new Course(null, "Docker Essentials", "Learn container basics", "DevOps", null));
			courseRepo.save(new Course(null, "Kubernetes for Beginners", "Deploy and manage apps with Kubernetes", "DevOps", null));
			System.out.println("✅ Sample courses inserted into the database.");
		}
	}
}
