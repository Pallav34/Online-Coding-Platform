import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Read the entire line of input
        String inputLine = scanner.nextLine();
        
        // Check if the input string is a palindrome
        if (isPalindrome(inputLine)) {
            System.out.println("Palindrome");
        } else {
            System.out.println("Not Palindrome");
        }
    }

    // Method to check if a string is a palindrome
    public static boolean isPalindrome(String s) {
        //write your code here
        int left = 0;
        int right = s.length() - 1;
        
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

